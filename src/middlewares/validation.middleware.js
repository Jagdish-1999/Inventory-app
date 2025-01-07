import { body, validationResult } from "express-validator";


const validateFormDataMiddleware = (req, res, next) => {
    // data validation
    const { name, description, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trim() == "") {
        errors.push("Name is required");
    }
    if (!description || description.trim() == "") {
        errors.push("Description is required");
    }
    if (!price || parseFloat(price) < 0) {
        errors.push("Price is required and must be a positive number");
    }
    if (imageUrl) {
        try {
            const validUrl = new URL(imageUrl);
        } catch (error) {
            errors.push("Invalid image URL");

        }
    }

    if (errors.length > 0) {
        return res.render("new-product", { errorMessage: errors[0] });
    }
    next();
}

export const validateUsingLibrary = async (req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("price").isFloat({ gt: 0 }).withMessage("Price must be positive"),
        // body("imageUrl").isURL().withMessage("Invalid image URL")
        body("imageUrl").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Image is required!");
            }
            return true;
        })
    ]

    await Promise.all(rules.map((rule) => rule.run(req)))

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.render("new-product", { errorMessage: validationErrors.array()[0].msg })
    }
    // res.render('new-product', { errorMessage: null })
    next();
}

export default validateFormDataMiddleware