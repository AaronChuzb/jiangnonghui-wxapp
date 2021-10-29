/*
 * @Date: 2021-10-25 14:31:19
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-28 14:19:35
 */
import store from '../store/index.js'
const http = 'http://www.jnhmarket.cn/api/api'
const request = (url, data) =>{
	uni.showLoading()
	let header = {}
	if(uni.getStorageSync('token')){
		header = {
        'Content-Type': 'application/json',
				'token': uni.getStorageSync('token')
    }
	} else {
		header = {
		  'Content-Type': 'application/json'
		}
	}
  return new Promise((resolve, reject)=>{
    uni.request({
      url: http + url,
      data: data,
      header: header,
      method: 'POST',
      success: ({ data }) => {
				uni.hideLoading()
				if(data.code == 10){
					uni.removeStorageSync('token')
					uni.showModal({
						title: '提示',
						content: '登录已过期',
						success: function (res) {
							if (res.confirm) {
								store.dispatch('login')
							} 
						}
					});
				} else {
					resolve(data)
				}
      },
      fail: (error) => {
				uni.hideLoading()
        reject(error)
      }
    })
  })
}

export default request