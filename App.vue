<!--
 * @Date: 2019-04-01 09:47:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-19 15:13:42
-->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
