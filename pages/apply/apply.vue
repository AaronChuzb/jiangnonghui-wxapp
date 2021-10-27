<template>
	<view class="page">
		<scroll-view scroll-y="true" style="height: 100vh;background: #FFFFFF;">
			<view style="height: 34rpx;background: #F8F8F8;"></view>
			<view style="height: 44rpx;"></view>
			<view class="form">
				<view class="form-item">
					<view class="title"><view>店铺单元</view> <!-- <view class="valid">{{ rules['store'].msg }}</view> --></view>
					<view class="content">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="picker">
								<input type="text" value=""  placeholder="请选择区域" placeholder-class="input-placeholder" disabled />
								<image src="../../static/pulldown.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
					<view class="content">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="picker">
								<input type="text" value=""  placeholder="请选择档口" placeholder-class="input-placeholder" disabled />
								<image src="../../static/pulldown.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="title"><view>姓名</view> <!-- <view class="valid">{{ rules['name'].msg }}</view> --></view>
					<view class="content">
						<input type="text" value=""  placeholder="请输入姓名" placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="form-item">
					<view class="title">手机号码</view>
					<view class="content">
						<input type="text" value=""  placeholder="请输入手机号码" placeholder-class="input-placeholder" />
					</view>
				</view>
			</view>
			<view class="submit" hover-class="button-hover">提交</view>
			<view style="height: 200rpx"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				action: 'http://www.example.com',
				index: 0,
				showUploadList: false,
				array: ['静态','静态','静态','静态'],
				form:{
					area: '',
					mouth: '',
					name: '',
					phone: '',
				},
				rules: {
					area: { required: true, msg: '请选择店铺' },
					mouth: { required: true, msg: '请选择档口' },
					name: { required: true, msg: '请填写姓名' },
					phone: { required: true, msg: '请输入手机号码' },
				}
			}
		},
		methods:{
			bindPickerChange(){
				
			},
			chooseSex(index){
				this.form.sex = index
			},
			radioChange(e){
				console.log(e)
				if(e.detail.value == '2'){
					this.form.controller = false
				} else {
					this.form.controller = true
				}
			},
			valid(){
				let arr = Object.keys(this.rules)
			},
			submit(){
				
			}
		}
	}
</script>

<style lang="scss">
.form-item{
	width: 690rpx;
	margin-left: 30rpx;
	margin-bottom: 40rpx;
	.title{
		font-size: 28rpx;
		font-weight: 500;
		line-height: 28rpx;
		color: #222222;
		margin-bottom: 20rpx;
	}
	.content{
		width: 690rpx;
		height: 90rpx;
		background: #F8F8F8;
		border-radius: 2rpx;
		margin-bottom: 20rpx;
		padding: 0 30rpx;
		input{
			height: 90rpx;
			line-height: 90rpx;
			font-size: 32rpx;
			font-weight: 500;
		}
		.input-placeholder{
			line-height: 90rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #999999;
		}
		.picker{
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;
			font-weight: 500;
			color: #999999;
			image{
				width: 28rpx;
				height: 28rpx;
			}
		}
		.sex-box{
			display: flex;
			position: relative;
			justify-content: space-between;
			.item{
				position: relative;
				width: 300rpx;
				text-align: center;
				line-height: 90rpx;
				z-index: 2;
			}
		}
	}
}
.submit{
	width: 690rpx;
	height: 100rpx;
	background: #03A69A;
	box-shadow: 0rpx 8rpx 30rpx rgba(18, 97, 91, 0.3);
	border-radius: 10rpx;
	line-height: 100rpx;
	text-align: center;
	font-size: 32rpx;
	font-weight: 500;
	color: #FFFFFF;
	margin: 120rpx auto;
}
</style>

