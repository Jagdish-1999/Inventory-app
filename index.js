import path from 'path';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';

import ProductsController from './src/controllers/product.controller.js';
import validateFormDataMiddleware, { validateUsingLibrary } from './src/middlewares/validation.middleware.js';

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

const productController = new ProductsController();
app.get('/', productController.getProducts);
app.get('/new', productController.getAddProductForm);
app.post('/new', validateUsingLibrary, productController.postAddNewProduct);
app.get('/update/:id', productController.getUpdateProductView);
app.post('/update', productController.postUpdateProduct);
app.post("/delete/:id", productController.getDeleteProduct)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[Server] is listening on port http://localhost:${PORT}`);
})