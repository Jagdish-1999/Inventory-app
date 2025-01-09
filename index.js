import path from 'path';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';

import ProductsController from './src/controllers/product.controller.js';
import validateFormDataMiddleware, { validateUsingLibrary } from './src/middlewares/validation.middleware.js';
import uploadFilesMiddleware from './src/middlewares/file-uploads.middleware.js';
import UserController from './src/controllers/user.controller.js';
import verifyUser from './src/middlewares/auth.middleware.js';

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "your secret goes here",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const productController = new ProductsController();
const userController = new UserController();

app.get('/', productController.getProducts);
app.get('/new', verifyUser, productController.getAddProductForm);
app.post('/new', verifyUser, uploadFilesMiddleware, validateUsingLibrary, productController.postAddNewProduct);
app.get('/update/:id', verifyUser, productController.getUpdateProductView);
app.post('/update', verifyUser, validateUsingLibrary, productController.postUpdateProduct);
app.post("/delete/:id", verifyUser, productController.getDeleteProduct);

app.get("/register", userController.getRegisterView);
app.post("/register", userController.addUser);
app.get("/login", userController.getLoginView);
app.post("/login", verifyUser, userController.getUser);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[Server] is listening on port http://localhost:${PORT}`);
})