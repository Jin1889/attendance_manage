import Vue from 'vue'
import Vuex from 'vuex'
import departmentModule from './modules/DepartmentModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    department: departmentModule
  }
})
