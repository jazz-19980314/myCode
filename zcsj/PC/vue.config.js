/*
 * @Author: your name
 * @Date: 2020-11-12 08:54:08
 * @LastEditTime: 2020-11-18 14:34:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhch-saber\vue.config.js
 */
module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    });
    const entry = config.entry('app');
    entry.add('babel-polyfill').end();
    entry.add('classlist-polyfill').end();
    entry.add('@/mock').end();
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 1888,
    proxy: {
      '/api': {
        //本地服务接口地址
        // target: 'http://111.231.238.159:9090',
        //远程演示服务地址,可用于直接启动项目
        target: 'http://192.168.0.88:9090',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};
