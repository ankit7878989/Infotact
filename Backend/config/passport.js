const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy; 
const User = require("../models/User");
passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {  
        try {
            let user = await User.findOne({ googleId: profile.id });

            console.log(profile,"google user");
    
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    userId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    role: "user",  
                    password: null,
                });
                await user.save();
            }
    
            return done(null, user);  
        } catch (err) {
            return done(err);  
        }
    }));
    






