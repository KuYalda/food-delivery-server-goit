const http = require('http');
const router = require('./src/router');
const { port } = require('./config');
const { e404, e405 } = require('./src/hellpers/error.hellpers');

const parseRoute = req => {
  global.incomingRoute = new URL(`http://${req.headers.host}${req.url}`);
  Object.defineProperty(global.incomingRoute, 'getAll', { enumerable: true, writable: true, value: false })

  const { incomingRoute } = global;

  console.log('incomingRoute :', incomingRoute);
  console.log('global.incomingRoute.getAll :', global.incomingRoute.getAll);
  const { pathname, search } = incomingRoute;
  const pathArr = pathname.replace(/\/$/, '').slice(1).split('/');
  global.incomingRoute.pathname = `/${pathArr[0]}/${pathArr[1]}`;
  console.log('pathArr :', pathArr);

  if (pathArr.length === 2 && !search) {
    global.incomingRoute.getAll = true;
  } else if (pathArr.length === 2) {
    global.incomingRoute.getAll = false;
  } else {

  }

  console.log(global.incomingRoute.getAll);
  console.log(global.incomingRoute.pathname);

  if (pathnameLength === 2 && incomingRoute.searchParams) console.log('Evrica');

  let route;

  if (!str.includes('products')) {
    route = str;
    console.log('products route :', route);
    return route;
  }

  const arr = str.slice(1).split('/');
  console.log('arr :', arr);
  route = arr.length === 2 ? str : `/${arr[0]}/${arr[1]}`;
  console.log('route :', route);
  return route;
}

const startServer = port => {

  const server = http.createServer((req, res) => {

    const url = parseRoute(req);

    try {

      if (!router.has(req.url)) throw e404(`URL ${req.url} not found`);

      const route = router.get(req.url);

      if (!route.has(req.method)) throw e405(`On URL ${req.url} method ${req.method} not allowed`);

      const handler = route.get(req.method);

      handler(req, res);

    } catch (err) {
      const { statusCode, message } = err;
      res.writeHead(statusCode || 520).end(message || 'Unknown message, try later')
      console.error({ err });
      return;
    }

  });

  server.listen(port);

}

startServer(port);