import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    attendanceState: '',
    employeeId: '',
  },
  getters: {
  },
  mutations: {
    SET_ATTENDANCE_STATE(state, value){
      state.attendanceState = value
    },
    SET_EMPLOYEE_ID(state, value){
      state.employeeId = value
    }
  },
  actions: {
  },
  modules: {
  }
})
