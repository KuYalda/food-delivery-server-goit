const { e404 } = require('./error.hellpers');

const getRequestBody = req => new Promise((res, rej) => {

  let buffer = '';

  req.setEncoding('utf8')
    .on('data', chunk => buffer += chunk)
    .on('error', err => rej(err))
    .on('end', () => res(buffer))
});

// const getAnysingById = (where, id) => new Promise((res, rej) => {

// });

const parseRoute = req => new Promise(res => {

  class IncomingRoute extends URL {
    constructor(req) {
      super(`http://${req.headers.host}${req.url}`)
      this.method = req.method;
      this.setCorrectData();
    }

    setCorrectData() {
      const { pathname, method, search } = this;
      const pathArr = pathname.replace(/\/$/, '').slice(1).split('/');
      let name = '';

      if (method === 'GET' && pathArr.length === 2 && !search) this.getAll = true;

      for (let i = 0; i < pathArr.length; i++) {
        if (i <= 1) name += `/${pathArr[i]}`;
        if (i > 1) {
          const val = Number.isNaN(+pathArr[i]) ? 'categories' : 'id';
          this.searchParams.append(val, pathArr[i]);
        }
      }

      this.pathname = name;
    }
  }

  Object.defineProperty(URL, 'incomingRoute', {
    value: new IncomingRoute(req),
    enumerable: false,
    configurable: true,
    writable: false,
  })

  return res();
})

module.exports = {
  getRequestBody,
  parseRoute,
}