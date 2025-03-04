const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { bucket } = require("../config/firebase.config");
const Link = require("../models/Link");

exports.getUser = async (req, res) => {
  try {

    let userDoc;

    if (req.params.id) {
      userDoc = await User.findOne({ _id: req.params.id });
    } else {
      userDoc = await User.findOne({ _id: req.user.userId });
    }

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert to plain object before modifying
    const user = userDoc.toObject();
    delete user.password; // Now safe to remove

    // Fetch user links
    const links = await Link.find({ userId: user._id, category: "LINK" });
    const shops = await Link.find({ userId: user._id, category: "SHOP" });

    // Attach links and shops to user object
    user.links = links;
    user.shops = shops;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided in request
    if (req.body.userName) {
      user.userName = req.body.userName;
      user.isUsernameAvailable = true;
    }
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    // Handle password update with hashing
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();

    // Convert to object before deleting password
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json(userObj);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserAppearanceSettings = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const image = req.file;
    if (image) {
      const fileName = `profile_${Date.now()}_${req.user.firstName}_${
        req.user.lastName
      }_${uuidv4()}`;
      const file = bucket.file(fileName);

      // Save file to Google Cloud Storage
      await file.save(req.file.buffer, { contentType: req.file.mimetype });

      // Make the file public
      await file.makePublic();

      // Assign the generated public URL
      let profileImageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      user.profilePicture = profileImageUrl;
    } else {
      user.profilePicture = null;
    }

    const linksData = req.body.links ? JSON.parse(req.body.links) : [];
    const shopsData = req.body.shops ? JSON.parse(req.body.shops) : [];

    const allLinks = [...linksData, ...shopsData];

    if (Array.isArray(allLinks)) {
      for (const link of allLinks) {
        if (link._id) {
          await Link.findByIdAndUpdate(link._id, {
            title: link.title,
            url: link.url,
            type: link.type,
            category: link.type==="OT" ? "SHOP" : "LINK",
            isPublic: link.isPublic
          });
        } else {
          const newLink = new Link({
            title: link.title,
            url: link.url,
            type: link.type,
            category: link.type==="OT" ? "SHOP" : "LINK",
            isPublic: link.isPublic,
            userId: user._id, // ✅ Include userId
          });
          await newLink.save();
        }
      }
      if (req.body.links.length === 0) {
        await Link.deleteMany({ userId: user._id });
      }
    }

    // Update user preferences
    const fieldsToUpdate = ["userName", "biography", "appearanceSettings"];

    fieldsToUpdate.forEach((field) => {
      if (field === "appearanceSettings") {
        user[field] = JSON.parse(req.body[field]);
      } else if (req.body[field]) {
        user[field] = req.body[field];
      }
    });
    
    if (req.body?.themeVariant) {
      user.themeVariant = req.body.themeVariant;
    }
    if (req.body.fontFamily) {
      user.typography.fontFamily = req.body.fontFamily;
    }

    await user.save();
    res.status(200).json({ message: "Appearance settings updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
