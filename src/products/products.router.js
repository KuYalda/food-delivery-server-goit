const { getAllProducts } = require('./products.controller');

const productsRouter = new Map();

productsRouter.set('GET', getAllProducts);

module.exports = productsRouter;