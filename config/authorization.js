
exports.requiresLogin = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //TODO error message
    res.redirect('/login');
}
