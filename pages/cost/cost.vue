<template>
	<view>
		<u-tabbar :list="tabbar" :mid-button="true" active-color='#03A69A' inactive-color="#BEBEBE"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: ''
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
