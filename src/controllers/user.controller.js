import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {
    getRegisterView(req, res) {
        return res.render("register")
    }

    addUser(req, res) {
        const { name, email, password } = req.body;
        new UserModel(Date.now(), name, email, password);
        return res.render("login")
    }

    getLoginView(req, res) {
        return res.render("login", { errorMessage: null })
    }

    getUser(req, res) {
        const user = UserModel.getUser(req.body.email, req.body.password);
        if (user) {
            const products = ProductModel.getAll();
            return res.render("products", { products })
        }
        return res.render("login", { errorMessage: "Invalid Credentials" })
    }
}