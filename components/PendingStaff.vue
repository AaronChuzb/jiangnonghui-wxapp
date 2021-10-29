<template>
	<view class="card">
		<view class="title-box">
			<view class="title">待审核缴费人员</view>
			<view class="num">{{ pageList.length }}</view>
		</view>
		<view class="item" v-for="(item, index) in pageList" :key="index">
			<image :src="item.headpic" mode="heightFix" class="avatar"></image>
			<view class="right" :style="{borderBottom: index == 1?'none':'2rpx solid #F8F8F8'}">
				<view class="name-line">
					<view class="name">{{ item.name }}</view>
					<view class="area">{{item.area_name}} <text>{{item.mouth_name}}</text></view>
				</view>
				<view class="phone">{{ item.phone }}</view>
				<view class="button-box">
					<view class="button reject" hover-class="button-hover" @click="staffReject(index)">拒绝</view>
					<view class="button resolve" hover-class="button-hover" @click="staffAgree(index)">通过</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { agree, reject } from '../api/store.js'
	export default {
		name:"PendingStaff",
		props:{
			pageList: {
				type:Array,
				default: ()=>{
					return []
				}
			}
		},
		methods:{
			staffAgree(index){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定要同意${this.pageList[index].name}的申请吗`,
					success: async function (res) {
						if (res.confirm) {
							const res = await agree(that.pageList[index].id)
							that.$toast(res.msg)
							that.$emit('done')
						}
					}
				})
			},
			staffReject(index){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定要拒绝${this.pageList[index].name}的申请吗`,
					success: async function  (res) {
						if (res.confirm) {
							const res = await reject(that.pageList[index].id)
							that.$toast(res.msg)
							that.$emit('done')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.card{
	width: 630rpx;
	padding-bottom: 61rpx;
	// height: 500rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 30rpx;
	margin: 30rpx auto 30rpx;
	// 
	.title-box{
		height: 94rpx;
		display: flex;
		padding: 0 28rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 4rpx solid #F8F8F8;
		.title{
			font-size: 28rpx;
			font-weight: bold;
			line-height: 28rpx;
			color: #333333;
		}
		.num{
			text-align: center;
			width: 50rpx;
			height: 40rpx;
			background: #FF5757;
			border-radius: 20rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	.item{
		height: 213rpx;
		display: flex;
		align-items: flex-start;
		width: 602rpx;
		margin-left: 30rpx;
		padding-top: 42rpx;
		.avatar{
			width: 120rpx;
			height: 120rpx;
			border-radius: 4rpx;
		}
		.right{
			width: 452rpx;
			padding-bottom: 31rpx;
			margin-left: 30rpx;
			border-bottom: 2rpx solid #F8F8F8;
			margin-bottom: 20rpx;
			// margin-right: 52rpx;
			.name-line{
				display: flex;
				justify-content: space-between;
				margin-right: 52rpx;
				.name{
					font-size: 36rpx;
					font-weight: bold;
					line-height: 36rpx;
					color: #333333;
				}
				.area{
					font-size: 32rpx;
					font-weight: 500;
					line-height: px;
					color: #333333;
					opacity: 1;
					text{
						font-weight: bold;
					}
				}
				
			}
			.phone{
				margin-top: 20rpx;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 28rpx;
				
				color: #999999;
			}
			.button-box{
				display: flex;
				margin-top: 24rpx;
				.button{
					width: 180rpx;
					height: 60rpx;
					border-radius: 4rpx;
					font-size: 24rpx;
					font-weight: 500;
					text-align: center;
					line-height: 60rpx;
				}
				.reject{
					background: #F9E8E8;
					margin-right: 40rpx;
					color: #FF5757;
				}
				.resolve{
					background: #03A69A;
					color: #FFFFFF;
				}
			}
		}
	}
}
</style>
