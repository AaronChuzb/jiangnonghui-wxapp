<!--
 * @Date: 2019-04-01 09:47:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-27 18:20:23
-->
<script>
	export default {
		onLaunch: function() {
			// 设定登录状态
			this.$store.dispatch('setStatus')
			// 获取用户信息设定用户权限， 如果登录了得话
			if(this.$store.getters.loginStatus){
				this.$store.dispatch('setPermission')
				this.$store.dispatch('getUserInfo')
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	::-webkit-scrollbar {
	  display: none;
	}
	.placeholder{
		height: env(safe-area-inset-bottom);
	}
  .page{
    background: #f2f2f2;
  }
	.button-hover {
	  background-color: rgba(0, 0, 0, 0.1);
	  opacity: 0.7;
	}
	.uni-radio .uni-radio-input{
		height: 40rpx!important;
		width: 40rpx!important;
		border-radius: 50%!important;
		border:1rpx solid #ececec!important;///替换边框 隐藏原有边框
	}
	 .uni-radio-input.uni-radio-input-checked{
		background-color: #ffffff!important;
		border-color: #03A69A!important;
		border-width: 15rpx;
		height: 20rpx!important;
		width: 20rpx!important;
		font-size: 0 !important;
	}
	 
	uni-radio .uni-radio-input.uni-radio-input-checked:before{
		font-size: 0;
	}
</style>
