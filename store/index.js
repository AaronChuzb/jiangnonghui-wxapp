/*
 * @Date: 2021-10-19 10:08:46
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-28 15:04:45
 */
import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters.js"
import { userLogin, getUserInfo }  from "../api/store.js"
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
    userInfo: {
			headpic:"",
			identity: 0,
			nick_name:"未登录",
			phone:""
		}, // 用户信息
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
        commit('SET_LOGIN_STATUS', false)
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
          uni.login({
            success: async (result) => {
							const data = await userLogin(result.code,  JSON.stringify(userInfo))
							commit('SET_PERMISSION', data.data.identity)
							uni.setStorageSync('token', data.data.token)
							commit('SET_LOGIN_STATUS', true)
							commit('SET_USERINFO', data.data)
							// 判断用户状态，初次登录或者没有选择身份或者电话号码
							if(data.data.identity == 0 || (data.data.phone == '')){
							// if(data.data.identity == 0){
								uni.reLaunch({
									url: '/pages/setup/setup',
								});
							}
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
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      console.log('用户信息:',res)
			// 如果用户信息中没有电话，进入引导页
			commit('SET_USERINFO', res.data)
			commit('SET_PERMISSION', res.data.identity)
			if(res.data.phone == ''){
				uni.reLaunch({
					url: '/pages/setup/setup',
				});
			}
    }
  },
  getters
})