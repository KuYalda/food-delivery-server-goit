const getRequestBody = req => new Promise((res, rej) => {

  let buffer = '';

  req.setEncoding('utf8')
    .on('data', chunk => buffer += chunk)
    .on('error', err => rej(err))
    .on('end', () => res(buffer))
});

const getResponseBody = data => new Promise(res => {

  const { searchParams } = URL.incomingRoute;
  const body = [];

  searchParams.forEach((val, key) => {
    data.forEach(el => {
      const arr = Array.isArray(el[key]) ? el[key] : [el[key]];
      if (arr.includes(val)) body.push(el);
    })
  })

  return res(body);
});

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
      console.log('this :', this);
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
  getResponseBody,
  parseRoute,
}