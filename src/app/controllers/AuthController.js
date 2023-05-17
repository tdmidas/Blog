const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const config = require('../../config');

class AuthController {
  async showRegisterForm(req, res) {
    res.render("register"); // Render the register form template
  }

  async showLoginForm(req, res) {
    res.render("login"); // Render the login form template
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
  
      // Generate a salt and hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already registered' });
      }
  
      // Create a new user in the database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.redirect('/login');
    } catch (error) {
      res.redirect("/register");
    }
  }

  async login(req, res) {
    try {
      passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }

        req.login(user, { session: false }, async (error) => {
          if (error) {
            return res.status(500).json({ message: 'Login failed' });
          }

          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, config.jwtSecret);
          // Send the token as a response
          res.status(200).json({ token });
        });
      })(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
  }
}


module.exports = new AuthController();
