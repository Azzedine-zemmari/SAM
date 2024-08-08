// passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Model/UsersModel'); // Adjust the path according to your project

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in our db
    const existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
        // Already have the user
        return done(null, existingUser);
    }
    
    // If not, create a new user in our db
    const newUser = await new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
    }).save();
    
    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
