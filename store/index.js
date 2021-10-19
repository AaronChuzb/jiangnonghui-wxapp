import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
	// 全局属性变量
	state: { // state的作用是定义属性变量。定义一个参数
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
		]
	},
})
