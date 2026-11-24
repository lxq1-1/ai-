import { createStore } from 'vuex'
import { login, getInfo } from '~/api/manager.js'
import { setToken, getToken, removeToken } from '~/composables/auth.js'

const store = createStore({
  state() {
    return {
      user: {},
      menus: [],
      ruleNames: [],
      asideWidth: '250px'
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user
    },
    SET_MENUS(state, menus) {
      state.menus = menus
    },
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user.name, user.password).then(res => {
          setToken(res.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          commit('SET_USERINFO', res)
          commit('SET_MENUS', res.menus)
          commit('SET_RULENAMES', res.ruleNames)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        removeToken()
        commit('SET_USERINFO', {})
        resolve()
      })
    }
  }
})

export default store