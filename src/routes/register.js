const express = require("express");
const router = express.Router();
const registerRouter = require("../app/controllers/RegisterController.js");
router.use("/", registerRouter.index);
module.exports = router;
