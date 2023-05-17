const express = require("express");
const router = express.Router();
const loginRouter = require("../app/controllers/LoginController.js");
router.use("/", loginRouter.index);
module.exports = router;
