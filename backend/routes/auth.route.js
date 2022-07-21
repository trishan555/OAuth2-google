const authRoute = (app, passport) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    )

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            //res.redirect('/')
            console.log('user authenticated')
        }
    )
}

module.exports = { authRoute }
