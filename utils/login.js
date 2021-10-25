export function login(){
	uni.getUserProfile({
		desc: "用于完善用户信息",
		success: (res) => {
			console.log(res)
		},
		fail: (err) => {
			console.log(err)
		}
	})
}