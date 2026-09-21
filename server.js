const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const appFile = path.join(__dirname, 'index.html');
const dataFile = '/data/maps.json';

function send(res, status, body, contentType = 'application/json') {
  res.writeHead(status, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
  res.end(body);
}

http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    return send(res, 200, fs.readFileSync(appFile), 'text/html; charset=utf-8');
  }
  if (req.method === 'GET' && req.url === '/api/maps') {
    if (!fs.existsSync(dataFile)) return send(res, 200, '{}');
    return send(res, 200, fs.readFileSync(dataFile));
  }
  if (req.method === 'PUT' && req.url === '/api/maps') {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 2_000_000) req.destroy(); });
    req.on('end', () => {
      try {
        const maps = JSON.parse(body);
        if (!maps.casa || !maps.deposito) throw new Error('Formato inválido');
        fs.writeFileSync(dataFile, JSON.stringify(maps, null, 2));
        send(res, 200, '{"ok":true}');
      } catch {
        send(res, 400, '{"ok":false,"error":"Mapa inválido"}');
      }
    });
    return;
  }
  send(res, 404, '{"error":"No encontrado"}');
}).listen(80, '0.0.0.0', () => console.log('RedMapa listo en puerto 80'));
