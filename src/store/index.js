import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabBarShow:true,
    profileTagsStr:''
  },
  mutations: {
    changeTabBarShow(state,flag){
        state.tabBarShow = flag
    },
    //更改profiletags
    changeProfileTags(state,str){
      state.profileTagsStr = str
    }
  },
  actions: {
  },
  getters: {
  }
})
