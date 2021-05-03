const userController = require("../controllers/userController.js").UserController;
const productController = require("../controllers/productController.js").ProductController;
const productMiddleware = require("../middleware/productMiddleware.js").ProductMiddleware;

module.exports = (app) => {
    var userObj = new userController();
    var productObj = new productController();
    var productMiddlewareObj = new productMiddleware();
    var productValidations = productMiddlewareObj.getValidations();

    app.get(`/`, (req, res)=>{
        res.render('pages/index');
    });

    //User Routes
    app.get('/login',userObj.listUsers);
    app.post('/login',userObj.loginUser);
    app.get('/logout',userObj.logout);

    //Product Routes
    app.get(`/products`,productObj.listProducts);
    app.get(`/products/add`,(req, res)=>{
        res.render('pages/products/add');
    });
    app.post(`/products/add`,productValidations,productMiddlewareObj.validateRequest,productObj.addProduct)
    app.get(`/products/:id/edit`,productObj.editProduct);

    app.post(`/products/:id/edit`,productValidations,productMiddlewareObj.validateRequest,productObj.updateProduct);

    app.get(`/products/:id/details`,productObj.getProduct);
    app.get(`/products/recommend`,productObj.getProductRecommendation);

    app.get(`*`, (req, res)=>{
        res.render('errors/404');
    });
};