// /* eslint-disable no-console */
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 'http://uku.kg/api/v1/';
const target = process.env.NEXT_PUBLIC_NODE_TARGET;
const dev = target === 'development';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Set up the proxy.
    if (dev) {
      server.use(
        '/api/v1',
        createProxyMiddleware({
          target: 'http://uku.kg/api/v1/',
          changeOrigin: true,
          logLevel: 'debug',
        })
      );
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen('http://uku.kg/api/v1/', (err) => {
      if (err) {
        throw err;
      }
      console.log(
        `ready - started server on 0.0.0.0:${port}, url: http://localhost:${port} [${target}]`
      );
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
