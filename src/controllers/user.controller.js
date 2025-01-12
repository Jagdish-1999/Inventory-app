
import UserModel from "../models/user.model.js";
import render from "./common.controller.js";

export default class UserController {
    getRegisterView(req, res) {
        return render(req, res, "register")
    }

    registerUser(req, res) {
        const { name, email, password } = req.body;
        new UserModel(Date.now(), name, email, password);
        return render(req, res, "login")
    }

    getLoginView(req, res) {
        return render(req, res, "login")
    }

    loginUser(req, res) {
        const { email, password } = req.body
        const user = UserModel.getUser(email, password);
        if (user) {
            req.session.user = email;
            return res.redirect("/")
        }
        return render(req, res, "login", { errorMessage: "Invalid Credentials" })
    }

    logout(req, res) {
        res.clearCookie("lastVisit")
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send("Some thing went wrong! Please try again");
            } else {
                res.redirect("/login");
            }
        })
    }
}