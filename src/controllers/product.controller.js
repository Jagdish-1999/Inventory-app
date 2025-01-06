import ProductModel from '../models/product.model.js';

export default class ProductsController {
    getProducts(_req, res) {
        const products = ProductModel.getAll();
        return res.render("products", { products });
    }

    getAddProductForm(_req, res) {
        return res.render("new-product", { errorMessage: null });
    }

    postAddNewProduct(req, res) {
        ProductModel.add(req.body);
        const products = ProductModel.getAll();
        return res.render("products", { products });
    }

    getUpdateProductView(req, res) {
        const product = ProductModel.getById(req.params.id)
        if (product) {
            res.render("update-product", { product, errorMessage: null })
        } else {
            res.status(401).send("Product not found")
        }
    }

    postUpdateProduct(req, res) {
        ProductModel.update(req.body);
        const products = ProductModel.getAll();
        return res.render("products", { products });
    }

    getDeleteProduct(req, res) {
        const id = req.params.id;
        const product = ProductModel.getById(id);
        if (!product) {
            res.status(401).send("Product not found")
        }
        ProductModel.delete(id);
        const products = ProductModel.getAll();
        return res.render("products", { products });
    }
}