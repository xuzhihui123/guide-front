/*
 * @Author: Lancer
 * @Date:2019/12/17
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/17
 */

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'common':'components/common',
        'content':'components/content',
        'router':'@/router',
        'store':'@/store',
        'commonjs':'@/commonjs'
      }
    }
  }
}