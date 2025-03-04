const { saveCTA } = require("../controllers/analytics.controllers");
const { isAuth } = require("../middlewares/auth");
const router = require("express").Router();

router.post("/postClick", isAuth, saveCTA);
// router.post("/fetchData", isAuth, analytics.getAnalytics);

module.exports = router;