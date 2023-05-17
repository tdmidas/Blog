const express = require("express");
const router = express.Router();
const passport = require('passport');
const AuthController = require("../app/controllers/AuthController.js");

router.post("/register", AuthController.register);

// Protected route that requires authentication
router.post("/login", passport.authenticate('jwt', { session: false }), AuthController.login);

router.get("/register", AuthController.showRegisterForm);
router.get("/login", AuthController.showLoginForm);

module.exports = router;
