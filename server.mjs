import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '::';
const port = 9999;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.on('listening', () => {
    const addr = server.address();
    console.log('> HTTP server listening on:', addr);
  });

  server.on('error', (err) => {
    console.error('HTTP server error:', err);
  });

  server.listen(port, hostname, () => {
    console.log(`> Next.js ready on http://[::]:${port}`);
  });
});