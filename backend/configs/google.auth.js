const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv')
dotenv.config()

const googleAuth = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_REDIRECT_URI,
            },
            function (accessToken, refreshToken, profile, callback) {
                console.log(profile)
                return callback(null, profile)
            }
        )
    )
    passport.serializeUser((user, callback) => {
        callback(null, user.id)
    })

    passport.deserializeUser((id, callback) => {
        callback(null, id)
    })
}

module.exports = { googleAuth }
