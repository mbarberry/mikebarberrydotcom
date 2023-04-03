const path = require('path');

const NextServer = require('next/dist/server/next-server').default;
const { config } = require('./.next/required-server-files.json');
const express = require('express');

const server = new NextServer({
  dev: false,
  dir: __dirname,
  conf: {
    ...config,
  },
  destDir: './.next',
});

const handler = server.getRequestHandler();

const createServer = () => {
  const server = express();
  const router = express.Router();
  server.set('trust proxy', true);

  router.use(express.urlencoded({ extended: true }));
  router.use(express.text());
  router.use(express.json());
  router.use('/_next', express.static(path.join(__dirname, '/.next')));

  router.get('/example', async (req, res) => {
    res.send('Success');
  });

  router.all('/*', async (req, res) => {
    await handler(req, res);
  });
  server.use('/', router);
  return server;
};

const serverInstance = createServer();
exports.server = serverInstance;

if (!process.env.LAMBDA) {
  const port = 3001;
  serverInstance.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
}
