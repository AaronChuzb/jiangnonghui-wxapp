import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters.js"
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
		userInfo: {}, // 用户信息
		isLogin: false // 登录状态
	},
	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)
		},
		SET_LOGIN_STATUS: (state, status) => {
			state.isLogin = status
		}
	},
	actions: {
		login({
			commit
		}, userInfo) {
			commit('SET_USERINFO', userInfo)
		},
		setStatus({
			commit
		}, status) {
			commit('SET_LOGIN_STATUS', status)
		}
	},
	getters
})
