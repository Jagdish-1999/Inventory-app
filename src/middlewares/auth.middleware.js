const verifyUser = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

export const validateShowLoginUI = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/")
    }
    next();
}

export default verifyUser;