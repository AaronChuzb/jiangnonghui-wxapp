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
</style>
