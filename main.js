const http = require('http');
const router = require('./src/router');
const { port } = require('./config');

const startServer = port => {

  const server = http.createServer((req, res) => {
    try {
      !router.has(req.url) && res.writeHead(404).end('Not found');
      const route = router.get(req.url);

      !route.has(req.method) && res.writeHead(405).end('Method not allowed');
      const handler = route.get(req.method);

      handler(req, res);

    } catch (err) {
      console.error({ err });
    }

  });

  server.listen(port);

}

startServer(port);