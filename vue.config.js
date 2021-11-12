const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: true,
  devServer: {
    port: 4200,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api/v1': {
        target: 'http://172.30.1.53:8080',
        ws: true,
        secure: false,
      },
      '/proxy': {
        target: 'http://172.30.1.53:8080',
        ws: true,
        secure: false,
      },
      '/api/project': {
        target: 'http://192.168.80.32:32058',
      },
      '/auth': {
        target: 'http://192.168.80.32:31492',
      },
      '/terminal': {
        target: 'http://172.30.1.53:28083',
        secure: false,
        // proxy_set_header X-Real-IP $remote_addr;
        // proxy_set_header X-Forwarded-For $remote_addr;
        // proxy_set_header Host $host;
        // pathRewrite: {
        //   "^/webkubectl/?$": "",
        //   "^/webkubectl/(.*)$": "/$1",
        //   }
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  publicPath: '/ui/',
};
