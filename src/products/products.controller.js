const fsPromises = require('fs').promises;
const { productsDb } = require('../../config');

class ProductsController {

  constructor() {

  }
  get getProducts() {
    return this._setHandllerGetMethod.bind(this);
  }

  _setHandllerGetMethod(req, res) {
    const { incomingRoute: { getAll, id, search } } = URL;
    if (getAll) return this._getAllProducts(res);
    if (id && !search) return this._getProductById(res);
    return new Error();
  }

  async _getProductById(res) {
    try {
      const { incomingRoute: { id } } = URL;
      const products = await fsPromises.readFile(productsDb, 'utf-8');
      const product = JSON.parse(products).find(el => el.id === +id);

    } catch (err) {
      const { statusCode, message } = err;
      res.writeHead(statusCode || 500).end(message || 'Internal Server Error');
      console.error(err);

    }

  }

  async _getAllProducts(res) {
    try {
      const file = await fsPromises.stat(productsDb);
      const products = await fsPromises.readFile(productsDb, 'utf-8');

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Content-Length": file.size
      });
      res.write(products);
      res.end();
    } catch (err) {
      const { statusCode, message } = err;
      res.writeHead(statusCode || 500).end(message || 'Internal Server Error');
      console.error(err);
    }

  }
}

module.exports = new ProductsController();