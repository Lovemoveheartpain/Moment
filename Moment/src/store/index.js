import Vue from 'vue'
import Vuex from 'vuex'
import history from './history'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag: false,
    isShow: false
  },
  mutations: {
    loginVerify(state, data) {
      state.flag = data;
    },
    changeShow(state, data) {
      state.isShow = data;
    }
  },
  actions: {

  },
  modules: {
    history
  }
})
