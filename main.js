const http = require('http');
const router = require('./src/router');
const { port } = require('./config');
const { e404, e405 } = require('./src/hellpers/error.hellpers');
const { parseRoute } = require('./src/hellpers/main.hellpers');


const startServer = port => {

  const server = http.createServer(async (req, res) => {

    try {
      await parseRoute(req);
      const { incomingRoute: { pathname, method } } = URL;

      if (!router.has(pathname)) throw e404(`URL ${req.url} not found`);

      const route = router.get(pathname);

      if (!route.has(method)) throw e405(`On URL ${req.url} method ${req.method} not allowed`);

      const handler = route.get(method);

      handler(req, res);

    } catch (err) {
      const { statusCode, message } = err;
      res.writeHead(statusCode || 520).end(message || 'Unknown message, try later')
      console.error({ err });
      return;
    }
  });

  server.listen(port);

};

startServer(port);