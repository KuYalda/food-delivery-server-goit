const { getProducts } = require('./products.controller');

const productsRouter = new Map();

productsRouter.set('GET', getProducts);

module.exports = productsRouter;