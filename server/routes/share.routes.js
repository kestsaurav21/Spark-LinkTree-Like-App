const { getShareLink } = require("../controllers/share.controllers");
const { isAuth } = require("../middlewares/auth");
const router = require("express").Router();

router.get("/profile", isAuth, getShareLink);

module.exports = router;