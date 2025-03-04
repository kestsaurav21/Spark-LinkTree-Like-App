const multer = require("multer");
const {
  updateUserInfo,
  getUser,
  updateUserAppearanceSettings
} = require("../controllers/user.controllers");
const { isAuth } = require("../middlewares/auth");
const router = require("express").Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 25 * 1024 * 1024 }
});

router.get("/userData", isAuth, getUser);
router.put("/update", isAuth, updateUserInfo);
router.put(
  "/updateUserPreferences",
  isAuth,
  upload.single("image"),
  updateUserAppearanceSettings
);
router.get("/userData/:id", getUser);

module.exports = router;
