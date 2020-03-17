import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false



//引入百度地图组件
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'vgrSAB4UtprjZHvfPP9yxpLfR73IqysG'
})



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
import {Uploader} from 'vant';

Vue.use(Uploader);

import { Notify } from 'vant';

Vue.use(Notify);

import { Field } from 'vant';

Vue.use(Field);
import { Cell, CellGroup } from 'vant';

import { Popup } from 'vant';

Vue.use(Popup);

import { NavBar } from 'vant';

Vue.use(NavBar);


import { NoticeBar } from 'vant';

Vue.use(NoticeBar);

Vue.use(Cell).use(CellGroup);

import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);

import { Overlay } from 'vant';
import moment from "moment";

Vue.use(Overlay);


Vue.directive('focus', {
// 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
// 聚焦元素
    el.focus()
  }
})


Vue.filter('dateFormat',(str,data="YYYY-MM-DD")=>{
  return moment(str).format(data)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
