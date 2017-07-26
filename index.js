var liveServer = require('live-server');
var proxy = require('http-proxy-middleware');

var params = {
  port: 8080,
  host: '0.0.0.0',
  root: './ui',
  ignore: 'jspm_packages',
  wait: 1000,
  // mount: [[]],
  logLevel: 2,
  // middleware: [proxy('http://127.0.0.1:3010')],
};

liveServer.start(params);