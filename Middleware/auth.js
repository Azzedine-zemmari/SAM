function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        return res.status(403).send('Accès refusé. Vous devez être connecté pour accéder à cette page.');
    }
}

module.exports = isAuthenticated;