const User = require("../models/User");

exports.getShareLink = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(404).json({ message: "Incorrect Link" });
    }

    res.status(200).json({
      shareLink: `${process.env.CLIENT_URL}/share/${user._id}`
    });

  } catch (err) {
    res.status(500).json(err);
  }
};