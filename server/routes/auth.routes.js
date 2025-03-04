const { createUser, loginUser } = require("../controllers/auth.controllers");

const router = require("express").Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;