const fsPromises = require('fs').promises;
const { productsDb } = require('../../config');

class ProductsController {

  constructor() {
  }
  get getAllProducts() {
    return this._getAllProducts.bind(this);
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