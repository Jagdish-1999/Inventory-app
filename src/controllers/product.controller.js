import ProductModel from '../models/product.model.js';
import render from './common.controller.js';

export default class ProductsController {
    getProducts(req, res) {
        const products = ProductModel.getAll();
        return render(req, res, "products", { products });
    }

    getAddProductForm(req, res) {
        return render(req, res, "new-product");
    }

    postAddNewProduct(req, res) {
        const imageUrl = "images/" + req.file.filename;
        ProductModel.add(req.body, imageUrl);
        res.redirect("/")
    }

    getUpdateProductView(req, res) {
        const product = ProductModel.getById(req.params.id)
        if (product) {
            render(req, res, "update-product", { product })
        } else {
            res.status(401).send("Product not found")
        }
    }

    postUpdateProduct(req, res) {
        const product = ProductModel.update(req.body);
        if (product) {
            return res.redirect("/")
        }
    }

    getDeleteProduct(req, res) {
        const id = req.params.id;
        const product = ProductModel.getById(id);
        if (!product) {
            res.status(401).send("Product not found")
        }
        ProductModel.delete(id);
        return res.redirect("/")
    }
}