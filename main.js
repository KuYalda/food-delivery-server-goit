const http = require('http');
const router = require('./src/router');
const { port } = require('./config');
const { e404, e405 } = require('./src/hellpers/error.hellpers');

const startServer = port => {

  const server = http.createServer((req, res) => {
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