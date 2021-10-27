import request from "../utils/request";

// 用户登录
export function userLogin(code, user){
	return request('/login/login', {
		code,
		user
	})
}

// 店铺列表
export function storeList(page, limit, type){
	// 老板
	if(type == 2){
		return request('/shop/user_shop', {
			page, limit
		})
	} else { // 员工
		return request('/shop/job_shop', {
			page, limit
		})
	}
}

// 同意员工申请
export function agree(job_id){
	return request('/shop/agree', {
		job_id
	})
}

// 拒绝员工申请
export function reject(job_id){
	return request('/shop/refuse', {
		job_id
	})
}



