/*
 * @Date: 2021-10-19 10:08:46
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-26 10:13:24
 */
import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters.js"
import { userLogin }  from "../api/store.js"
Vue.use(Vuex)
export default new Vuex.Store({
  // 全局属性变量
  state: {
    tabbar: [{
        iconPath: "/static/home.png",
        selectedIconPath: "/static/home_select.png",
        text: '首页',
        pagePath: "/pages/index/index"
      },
      {
        iconPath: "/static/pay.png",
        selectedIconPath: "/static/pay_select.png",
        text: '缴费',
        midButton: true,
        pagePath: "/pages/cost/cost"
      },
      {
        iconPath: "/static/shops.png",
        selectedIconPath: "/static/shops_select.png",
        text: '商铺',
        pagePath: "/pages/store/store"
      },
    ],
    token: '',
    userInfo: {}, // 用户信息
    isLogin: false ,// 登录状态
		permission: '', // 身份信息，员工还是店主
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_LOGIN_STATUS: (state, status) => {
      state.isLogin = status
    },
		SET_PERMISSION: (state, permission) => {
			state.permission = permission
		}
  },
  actions: {
    setStatus({ commit }) {
      if (uni.getStorageSync('token')) {
        commit('SET_LOGIN_STATUS', true)
      } else {
        commit('SET_LOGIN_STATUS', true)
      }
    },
		setPermission({ commit }){
			// 需要获取用户权限接口
			commit('SET_PERMISSION', data.data.permission)
		},
    login({ commit }) {
      uni.getUserProfile({
        desc: "用于完善用户信息",
        success: (res) => {
					var userInfo = res.userInfo
          uni.setStorageSync('userInfo', userInfo)
          uni.login({
            success: async (result) => {
							uni.reLaunch({
								url: '/pages/setup/setup',
							});
							// const data = await userLogin(result.code,  JSON.stringify(userInfo))
							// 判断用户状态，初次登录走引导流程
							// console.log(data)
							// // 登录成功之后，设定登录状态
							// commit('SET_LOGIN_STATUS', true)
							// // 设定用户信息
							// commit('SET_USERINFO', userInfo)
							// // 设定用户权限
							// commit('SET_PERMISSION', data.data.permission)
							// uni.setStorageSync('permission', data.data.permission)
            }
          })
        },
        fail: (err) => {
          uni.showToast({
            title: err,
            icon: 'none',
          })
        }
      })
    },
    getUserInfo({ commit }) {
      const userInfo = uni.getStorageSync('userInfo')
      if (userInfo) {
        commit('SET_USERINFO', userInfo)
      }
    }
  },
  getters
})