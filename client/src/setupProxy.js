const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/*', { target: 'http://localhost:8462' }));
  app.use(proxy('/nba/*', { target: 'http://localhost:8462' }));
  app.use(proxy('/api/**', { target: 'http://localhost:8462'}));
};
