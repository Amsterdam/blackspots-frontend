const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  console.log('registering api ...');
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:3005',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
