const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexPath = path.join(rootDir, 'index.html');
const faviconPath = path.join(rootDir, 'favicon.svg');
const port = Number(process.env.PORT) || 3000;

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

function sendError(response, statusCode, message) {
  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': 'text/html; charset=utf-8'
  });
  response.end(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${statusCode} | 4D Arquitectura + Diseño</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Arial,sans-serif;background:#0f1929;color:#fff}
    main{padding:32px;text-align:center;max-width:520px}
    h1{margin:0 0 12px;font-size:48px}
    p{margin:0;color:rgba(255,255,255,.75);line-height:1.6}
  </style>
</head>
<body>
  <main>
    <h1>${statusCode}</h1>
    <p>${message}</p>
  </main>
</body>
</html>`);
}

function setCacheHeaders(response, extension) {
  if (extension === '.html') {
    response.setHeader('Cache-Control', 'no-cache');
    return;
  }

  if (extension === '.svg' || extension === '.ico') {
    response.setHeader('Cache-Control', 'public, max-age=86400');
    return;
  }

  response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
}

function streamFile(filePath, response) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || 'application/octet-stream';

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      sendError(response, 404, 'El recurso solicitado no existe.');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size
    });
    setCacheHeaders(response, extension);

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => sendError(response, 500, 'Ocurrió un error al servir el archivo.'));
    stream.pipe(response);
  });
}

function resolveSafePath(urlPathname) {
  const decodedPath = decodeURIComponent(urlPathname);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(rootDir, normalizedPath);

  if (!filePath.startsWith(rootDir)) {
    return null;
  }

  return filePath;
}

function serveIndex(response) {
  streamFile(indexPath, response);
}

const server = http.createServer((request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      sendError(response, 405, 'Método no permitido.');
      return;
    }

    if (pathname === '/favicon.ico') {
      streamFile(faviconPath, response);
      return;
    }

    if (pathname === '/' || pathname === '/index.html') {
      serveIndex(response);
      return;
    }

    const requestedPath = resolveSafePath(pathname);
    if (!requestedPath) {
      sendError(response, 400, 'Ruta inválida.');
      return;
    }

    fs.stat(requestedPath, (error, stats) => {
      if (!error && stats.isFile()) {
        streamFile(requestedPath, response);
        return;
      }

      if (!error && stats.isDirectory()) {
        const nestedIndex = path.join(requestedPath, 'index.html');
        fs.stat(nestedIndex, (nestedError, nestedStats) => {
          if (!nestedError && nestedStats.isFile()) {
            streamFile(nestedIndex, response);
            return;
          }

          serveIndex(response);
        });
        return;
      }

      serveIndex(response);
    });
  } catch (error) {
    console.error('Unhandled request error:', error);
    sendError(response, 500, 'Ocurrió un error interno en el servidor.');
  }
});

server.on('clientError', (error, socket) => {
  console.error('Client error:', error.message);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port, () => {
  console.log(`4D Arquitectura server running on http://localhost:${port}`);
});
