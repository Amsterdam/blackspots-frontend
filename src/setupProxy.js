/* istanbul ignore file */
const proxy = require('http-proxy-middleware');

module.exports = function setup(app) {
  // eslint-disable-next-line no-console
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
