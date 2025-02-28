const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require('../models/User'); // Ensure you're importing the User model

const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// POST request to register a user
router.post('/register', registerUser);

// POST request to login a user
router.post('/login', loginUser);




// Route to trigger Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }), 
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      // Create JWT token for the authenticated user
      const token = jwt.sign(
        { userId: req.user._id }, 
        process.env.JWT_SECRET,   
        { expiresIn: "7d" }       
      );

      console.log(req.user.name, "success");

      const response = {
        success: true,
        token: token,
        user: req.user.name,
      };
      
      // Redirect for client-side handling
      res.redirect('http://localhost:5173/dashboard');
      
      // Alternatively, send JSON response if needed
      // res.json(response);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);


passport.serializeUser((user,done)=>{
    done(null,user.id);
})


passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    })
})

module.exports = router;


