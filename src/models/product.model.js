export default class ProductModel {
    constructor(_id, _name, _price, _description, _imageUrl) {
        this.id = _id;
        this.name = _name;
        this.price = _price;
        this.description = _description;
        this.imageUrl = _imageUrl
    }

    static getAll() {
        return products
    }

    static add({ name, price, description }, imageUrl) {
        return products.unshift(new ProductModel(`${Date.now()}`, name, price, description, imageUrl));
    }

    static getById(id) {
        return products.find((p) => p.id === id);
    }

    static update({ id, name, price, description, imageUrl }) {
        const product = products.find((p) => p.id === id);
        product.name = name
        product.description = description
        product.price = price
        product.imageUrl = imageUrl
        return products.filter(p => p.id !== id).unshift(product);
    }

    static delete(id) {
        products = products.filter((p) => p.id !== id)
    }
}

let products = [
    new ProductModel("1", "Product 1", 100, "Description 1", "https://books.google.com/books/content?id=1JzZDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"),
    new ProductModel("2", "Product 2", 200, "Description 2", "https://books.google.com/books/content?id=1JzZDwAAQBAJ&printsec=frontcover&img=2&zoom=5&edge=curl&source=gbs_api"),
    new ProductModel("3", "Product 3", 300, "Description 3", "https://books.google.com/books/content?id=1JzZDwAAQBAJ&printsec=frontcover&img=3&zoom=5&edge=curl&source=gbs_api"),
    new ProductModel("4", "Product 4", 400, "Description 4", "https://books.google.com/books/content?id=1JzZDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"),
    new ProductModel("5", "Product 5", 500, "Description 5", "https://books.google.com/books/content?id=1JzZDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"),
]