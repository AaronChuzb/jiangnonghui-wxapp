const http = 'http://jiannohui/api/api'
// const http = 'http://localhost:3000/app/api'
const request = (url, data) =>{
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
        resolve(data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export default request