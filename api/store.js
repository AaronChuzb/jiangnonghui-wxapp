import request from "../utils/request";

// 用户登录
export function userLogin(code, user){
	return request('/login/login', {
		code,
		user
	})
}

// 用户注册身份选择
export function choosePermission(identity){
	return request('/user/select_identity',{
		identity
	})
}

// 电话号码提交
export function changePhone(data){
	return request('/login/phone', data)
}


// 获取用户信息
export function getUserInfo(){
	return request('/user/get_user_info')
}


// 店铺列表
export function storeList(page, limit, permission){
	// 老板
	if(permission == 2){
		return request('/shop/user_shop', {
			page, limit
		})
	} else { // 员工
		return request('/shop/job_shop', {
			page, limit
		})
	}
}

// 区域和档口数据
export function areaAndMouth(){
	return request('/shop/area_mouth')
}


// 员工列表
export function staffList(){
	return request('/shop/shop_job')
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

// 新商铺申请
// export function storeDetail(data){
// 	return request('/shop/add_shop', data)
// }


// 商铺详细数据
export function storeDetail(shop_id){
	return request('/shop/view_shop_data', {
		shop_id
	})
}





