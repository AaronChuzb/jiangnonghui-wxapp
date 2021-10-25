import request from "../utils/request";

expect function login(code, user){
	return request('/login/login', {
		code,
		user
	})
}