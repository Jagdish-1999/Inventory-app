const verifyUser = (req, res, next) => {
    if (req.session.userEmail) {
        next();
    } else {
        res.redirect("/login");
    }
}

export default verifyUser;