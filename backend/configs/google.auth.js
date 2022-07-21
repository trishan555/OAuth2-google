const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv')
const User = require('../models/user.model')
dotenv.config()

const googleAuth = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_REDIRECT_URI,
            },
            async function (accessToken, refreshToken, profile, callback) {
                //console.log(profile)
                const userObj = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    gmail: profile.emails[0].value,
                    image: profile.photos[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                }

                const user = await User.findOne({ googleId: profile.id })
                if (user) {
                    return callback(null, user)
                }

                User.create(userObj)
                    .then((user) => {
                        return callback(null, user)
                    })
                    .catch((err) => {
                        return callback(err.message)
                    })
            }
        )
    )
    passport.serializeUser((user, callback) => {
        callback(null, user.id)
    })

    passport.deserializeUser((id, callback) => {
        User.findById(id, (err, user) => {
            callback(err, user)
        })
        callback(null, id)
    })
}

module.exports = { googleAuth }
