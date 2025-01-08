import path from 'path';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';

import ProductsController from './src/controllers/product.controller.js';
import validateFormDataMiddleware, { validateUsingLibrary } from './src/middlewares/validation.middleware.js';
import uploadFilesMiddleware from './src/middlewares/file-uploads-middleware.js';
import UserController from './src/controllers/user.controller.js';

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const productController = new ProductsController();
const userController = new UserController();

app.get('/', productController.getProducts);
app.get('/new', productController.getAddProductForm);
app.post('/new', uploadFilesMiddleware, validateUsingLibrary, productController.postAddNewProduct);
app.get('/update/:id', productController.getUpdateProductView);
app.post('/update', validateUsingLibrary, productController.postUpdateProduct);
app.post("/delete/:id", productController.getDeleteProduct);

app.get("/register", userController.getRegisterView);
app.post("/register", userController.addUser);
app.get("/login", userController.getLoginView);
app.post("/login", userController.getUser);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[Server] is listening on port http://localhost:${PORT}`);
})