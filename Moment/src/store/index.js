import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initItem: []
  },
  mutations: {
    getInitData(state, data) {
      state.initItem = data
    }
  },
  actions: {
    initAppData({ commit }, data) {
      commit('getInitData', data)
    }
  },
  modules: {
  }
})
