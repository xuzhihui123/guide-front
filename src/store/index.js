import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 获取储存在浏览器的 订单对象
const orderObj = JSON.parse(localStorage.getItem('orders') || '{}')

var receiveFlag = null
const receiveFlags = JSON.parse(localStorage.getItem('receiveFlag') || '{}')
if (receiveFlags.flag) {
  receiveFlag = receiveFlags.flag
} else {
  receiveFlag = false
}

const guideIds = JSON.parse(localStorage.getItem('userInfo') || '{}')
var guideId
if (guideIds.is_guide) {
  guideId = guideIds.user_id
} else {
  guideId = null
}

export default new Vuex.Store({
  state: {
    tabBarShow: true,
    profileTagsStr: '',
    orderObj,
    userIsPay: false,
    userIsCancel: false,
    receiveFlag,
    guideId
  },
  mutations: {
    changeTabBarShow (state, flag) {
      state.tabBarShow = flag
    },
    // 更改profiletags
    changeProfileTags (state, str) {
      state.profileTagsStr = str
    },
    changeOrderObj (state, obj) {
      state.orderObj = obj
    },
    changeUserIsPay (state, flag) {
      state.userIsPay = flag
    },
    changeReceiveFlag (state, flag) {
      state.receiveFlag = flag
    },
    changeGuideId (state, flag) {
      state.guideId = flag
    },
    changeUserCancel (state, flag) {
      state.userIsCancel = flag
    }
  },
  actions: {
  },
  getters: {
  }
})
