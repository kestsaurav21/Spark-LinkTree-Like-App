const CTA = require("../models/Cta");
const moment = require("moment");
const DeviceDetector = require("node-device-detector");

exports.saveCTA = async (req, res) => {
  try {
    const cta = new CTA(req.body);
    const device = req.headers["user-agent"];
    cta.device = device;
    cta.save();
    return res.status(200).json({ message: "opened link" });
  } catch (err) {
    res.status(500).json(err);
  }
};
