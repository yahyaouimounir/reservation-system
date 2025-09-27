const express = require("express");
const router = express.Router();
const userctrl = require("../controllers/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/signup", userctrl.signup);
router.post("/login", userctrl.login);
router.post("/create", auth, admin, userctrl.create);

module.exports = router;
