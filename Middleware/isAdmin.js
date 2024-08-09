// isAdmin middleware
function isAdmin(req, res, next) {
    // Check if the user is authenticated and is an admin
    if (req.session.user && req.session.user.isAdmin === 1) {
        // If the user is an admin, proceed to the next middleware or route handler
        return next();
    } else {
        // If the user is not an admin, redirect to a "not authorized" page or home page
        return res.status(403).send('Accès refusé. Vous devez être administrateur pour voir cette page.');
    }
}

module.exports = isAdmin;
