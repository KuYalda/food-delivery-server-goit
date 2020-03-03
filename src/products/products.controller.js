const { readFile, stat } = require('fs').promises;
const { productsDb } = require('../../config');
const { getResponseBody } = require('../hellpers/main.hellpers');

class ProductsController {

  constructor() {

  }
  get getProducts() {
    return this._setHandllerGetMethod.bind(this);
  }

  _setHandllerGetMethod(req, res) {
    const { getAll } = URL.incomingRoute;
    if (getAll) return this._getAllProducts(res);
    return this._getProducts(res);
  }

  async _getProducts(res) {
    try {
      const productsJson = await readFile(productsDb, 'utf-8');
      const products = JSON.parse(productsJson);
      const body = await getResponseBody(products);

      const status = body.length ? 'success' : 'no products';
      const jsonBody = JSON.stringify({
        status: status,
        products: body
      })

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Content-Length": new TextEncoder().encode(jsonBody).length,
      });
      res.write(jsonBody);
      res.end();
    } catch (err) {
      const { statusCode, message } = err;
      res.writeHead(statusCode || 500).end(message || 'Internal Server Error');
      console.error(err);

    }
  }

  async _getAllProducts(res) {
    try {
      const file = await stat(productsDb);
      const products = await readFile(productsDb, 'utf-8');

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