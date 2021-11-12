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
        // target: 'http://172.30.1.53:8080',
        target: 'http://172.30.1.112:8080', // ren
        // target: 'http://192.168.80.28:28001',
        ws: true,
        secure: false,
      },
      '/proxy': {
        // target: 'http://172.30.1.53:8080',
        target: 'http://172.30.1.112:8080', // ren
        // target: 'http://192.168.80.28:28001',
        ws: true,
        secure: false,
      },
      '/api/project': {
        target: 'http://192.168.80.32:32058',
      },
      '/auth': {
        target: 'http://192.168.80.32:31492',
      },
    }
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
