import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入百度地图组件
import BaiduMap from 'vue-baidu-map'

import 'assets/css/common.css'
import 'animate.css'
import 'assets/css/iconfont.css'
import { uncodeUtf16 } from 'commonjs/utils'

import { Tabbar, TabbarItem, Icon, Toast, ActionSheet, Uploader, Notify, Field, Cell, CellGroup, Popup, NavBar, NoticeBar, Dialog, Overlay } from 'vant'

import moment from 'moment'

import waterfall from 'vue-waterfall2'

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

Vue.use(BaiduMap, {
  ak: 'vgrSAB4UtprjZHvfPP9yxpLfR73IqysG'
})

Vue.use(Tabbar).use(TabbarItem)

Vue.use(Icon)

Vue.use(Toast)

Vue.use(ActionSheet)

Vue.use(Uploader)

Vue.use(Notify)

Vue.use(Field)

Vue.use(Popup)

Vue.use(NavBar)

Vue.use(NoticeBar)

Vue.use(Cell).use(CellGroup)

// 全局注册
Vue.use(Dialog)

Vue.use(Overlay)
Vue.use(waterfall)

Vue.directive('focus', {
// 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

moment.locale('zh-cn')

Vue.filter('dateFormat', (str, data = 'YYYY-MM-DD') => {
  return moment(str).format(data)
})

Vue.filter('parseText', (str) => {
  return uncodeUtf16(str)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
