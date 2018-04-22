import * as types from '../types'

const state = {
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
}

const mutations = {
  [types.SET_LOGIN_STATUS] (state, status) {
    state.loginStatus = status
  },
  [types.SET_USER_INFO] (state, info) {
    state.userInfo = info
  }
}

const actions = {
  setUserInfo ({ commit }, res) {
    localStorage.setItem('loginStatus', true)
    localStorage.setItem('userInfo', JSON.stringify(res))
    commit(types.SET_LOGIN_STATUS, true)
    commit(types.SET_USER_INFO, res)
  },
  setSignOut ({ commit }) {
    localStorage.removeItem('loginStatus')
    localStorage.removeItem('userInfo')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
  }
}

export default {
  state,
  actions,
  mutations
}
