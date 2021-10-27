<template>
	<view class="page">
		<view style="height: 40rpx;">
			
		</view>
		<view class="choose-item" :class="index == 2?'choose':'' " @click="index = 2">
			<view class="title" :class="index == 2?'choose':''">店主</view>
			<view class="sub-title" :class="index == 2?'choose':''">店铺管理者</view>
		</view>
		<view class="choose-item" :class="index == 1?'choose':''" @click="index = 1">
			<view class="title" :class="index == 1?'choose':''">员工</view>
			<view class="sub-title" :class="index == 1?'choose':''">店铺工作人员</view>
		</view>
		<view class="tips">
			请选择您的身份
		</view>
		<button class="button" type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: ''
			}
		},
		methods: {
			
			decryptPhoneNumber(e){
				if(this.index == ''){
					this.$toast('请选您的身份')
				}
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background: #f2f2f2;
	height: 100vh;
}
.choose-item{
	width: 690rpx;
	height: 214rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 3rpx 10rpx rgba(4, 5, 32, 0.1);
	border-radius: 10rpx;
	margin: 0 auto 40rpx;
	padding-left: 51rpx;
	padding-top: 38rpx;
	.title{
		font-size: 54rpx;
		line-height: 54rpx;
		font-weight: bold;
		color: #222222;
		letter-spacing: 14px;
	}
	.sub-title{
		margin-top: 37rpx;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 32rpx;
		color: #999999;
	}
}
.choose{
	color: #FFFFFF !important;
	background: #03A69A;
}
.button{
	position: fixed;
	bottom: 100rpx;
	left: 20rpx;
	right: 20rpx;
	width: 690rpx;
	height: 100rpx;
	background: #03A69A;
	box-shadow: 0rpx 8rpx 30rpx rgba(18, 97, 91, 0.3);
	border-radius: 10rpx;
	font-size: 32rpx;
	font-weight: 500;
	line-height: 100rpx;
	color: #FFFFFF;
}
.tips{
	margin-top: 60rpx;
	text-align: center;
}
</style>
