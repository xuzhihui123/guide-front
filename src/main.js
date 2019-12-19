import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import 'assets/css/common.css'
import 'animate.css'
import 'assets/css/iconfont.css'

import {Tabbar, TabbarItem} from 'vant';

Vue.use(Tabbar).use(TabbarItem);
import {Icon} from 'vant';

Vue.use(Icon);
import {Toast} from 'vant';

Vue.use(Toast);
import {ActionSheet} from 'vant';

Vue.use(ActionSheet);


Vue.directive('focus', {
// 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
// 聚焦元素
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
