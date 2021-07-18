module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // store the original user where user was trying to go'
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}