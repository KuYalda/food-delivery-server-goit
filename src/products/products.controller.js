const fsPromises = require('fs').promises;
const { urlParser } = require('./products.hellpers');
const { productsDb } = require('../../config');

class ProductsController {

  constructor() {
  }
  get getProducts() {
    return this._getHandller.bind(this);
  }

  _getHandller(req, res) {
    let fn;
    urlParser(req);
    fn = this._getAllProducts(req, res);

    return fn;
  }

  async _getProductById(req, res) {

  }

  async _getAllProducts(req, res) {
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
      console.error(err);
    }

  }
}

module.exports = new ProductsController();