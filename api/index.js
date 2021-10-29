import request from "../utils/request";

/* expect function login(code, user){
	return request('/login/login', {
		code,
		user
	})
} */

export function index(){
	return request('/index/index')
}

export function message(page, limit, state, message_id){
	return request('/index/message',{
		page, limit, state, message_id
	})
}

