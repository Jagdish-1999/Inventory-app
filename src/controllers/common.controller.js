const defaultOptions = {
    errorMessage: null,
    products: [],
    lastVisit: "",
    user: null
}

const render = (req, res, view, obj = defaultOptions) => {
    obj.user = req.session.user;
    obj.lastVisit = req.cookies.lastVisit;
    obj.products = obj.products
    obj.errorMessage = obj.errorMessage;
    return res.render(view, obj);
};

export default render;
