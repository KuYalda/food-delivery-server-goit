const products = require('./products/products.router');
const signUp = require('./signup/signup.router');
const { apiRoute } = require('../config');

const router = new Map();

router.setRoute = function (str, handler) {
  this.set(`${apiRoute}${str}`, handler);
  return this;
}

router.setRoute('/docs', new Map().set('GET', (req, res) => res.end('Hello, world!')))
router.setRoute('/products', products);
router.setRoute('/signup', signUp);

module.exports = router;