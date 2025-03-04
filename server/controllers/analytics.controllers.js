const CTA = require("../models/Cta");
const Link = require("../models/Link");

exports.saveCTA = async (req, res) => {
  try {
    const cta = new CTA(req.body);
    const device = req.headers["user-agent"];
    // increment click count for the link
    Link.findByIdAndUpdate(req.body.linkId, {
      $inc: { clickCount: 1 }
    });
    cta.device = device;
    cta.save();
    return res.status(200).json({ message: "opened link" });
  } catch (err) {
    res.status(500).json(err);
  }
};
