import { body, validationResult } from "express-validator";
import render from "../controllers/common.controller.js";
import ProductModel from "../models/product.model.js";

export const validateProductsInput = async (req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("price").isFloat({ gt: 0 }).withMessage("Price must be positive"),
        body("imageUrl").custom((value, { req }) => {
            if (req.url === "/update") {
                try {
                    const url = new URL(value);
                    return !!url
                } catch (error) {
                    throw new Error("Image url is invalid")
                }
            }
            // TODO add new product validation not working
            if (!req.file) {
                throw new Error("Image is required!");
            }
            return true;
        })
    ]

    await Promise.all(rules.map((rule) => rule.run(req)))

    const validationErrors = validationResult(req);
    console.log(validationErrors.array()[0]);
    if (!validationErrors.isEmpty()) {
        const product = ProductModel.getById(req.body.id);
        const currentPage = req.url === "/update" ? "update-product" : "new-product"
        return render(req, res, currentPage, { product, errorMessage: validationErrors.array()[0].msg })
    }
    next();
}
export const validateRegisterForm = async (req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is required")
    ]
    await Promise.all(rules.map((rule) => rule.run(req)))
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return render(req, res, "register", { errorMessage: validationErrors.array()[0].msg })
    }
    next();
}

export default validateProductsInput