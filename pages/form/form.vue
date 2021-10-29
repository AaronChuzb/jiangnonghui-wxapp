<template>
	<view class="page">
		<scroll-view scroll-y="true" style="height: 100vh;background: #FFFFFF;">
			<view style="height: 34rpx;background: #F8F8F8;"></view>
			<view style="height: 44rpx;"></view>
			<view class="form">
				<view class="form-item">
					<view class="title"><view>店铺单元</view> <!-- <view class="valid">{{ rules['store'].msg }}</view> --></view>
					<view class="content">
						<picker @change="areaChange" :range="areaAndMouths" range-key="area_name">
							<view class="picker">
								<input type="text" v-model="area.area_name" placeholder="请选择区域" placeholder-class="input-placeholder" disabled />
								<image src="../../static/pulldown.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
					<view class="content">
						<picker @change="mouthChange"  :range="mouths" range-key="mouth_name">
							<view class="picker">
								<input type="text" v-model="mouth.mouth_name" placeholder="请选择档口" placeholder-class="input-placeholder" disabled />
								<image src="../../static/pulldown.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="title"><view>姓名</view> <!-- <view class="valid">{{ rules['name'].msg }}</view> --></view>
					<view class="content">
						<input type="text" v-model="form.name"  placeholder="请输入姓名" placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="form-item">
					<view class="title">性别</view>
					<view class="content">
						<view class="sex-box">
							<view class="item" style="margin-left: -20rpx;" @click="chooseSex(1)" :class="form.sex == 1?'sex':''">男</view>
							<view class="item" style="margin-right: -20rpx;" @click="chooseSex(2)" :class="form.sex == 2?'sex':''">女</view>
							<view class="choose" :class="form.sex == 1?'left':'right'"></view>
						</view>
					</view>
				</view>
				<view class="form-item">
					<view class="title">手机号码</view>
					<view class="content">
						<input type="text" v-model="form.phone"  placeholder="请输入手机号码" placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="form-item">
					<view class="title">身份证号码</view>
					<view class="content">
						<input type="text" v-model="form.idcard"  placeholder="请输入身份证号码" placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="form-item">
					<view class="title">身份证地址</view>
					<view class="content">
						<input type="text" v-model="form.address"  placeholder="请输入身份证地址" placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="form-item">
					<view class="title">上传身份证照片</view>
					<view class="upload-list">
						<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" max-count="1" :action="action"> 
							<view slot="addBtn" class="upload-button" hover-class="button-hover">
								<image src="/static/reverse.png" mode="widthFix" class="icon"></image>
								<view class="tips">人像面</view>
							</view>
						</u-upload>
						<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" max-count="1" :action="action" style="margin-left: 30rpx;">
							<view slot="addBtn" class="upload-button" hover-class="button-hover">
								<image src="/static/positive.png" mode="widthFix" class="icon"></image>
								<view class="tips">国徽面</view>
							</view>
						</u-upload>
					</view>
				</view>
				<view class="form-item">
					<view class="title">上传营业执照照片</view>
					<view class="upload-list">
						<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" max-count="1" :action="action">
							<view slot="addBtn" class="upload-button-license" hover-class="button-hover">
								<image src="/static/license.png" mode="widthFix" style="width: 120rpx;height: 120rpx;"></image>
							</view>
						</u-upload>
					</view>
				</view>
				<view class="form-item">
					<view class="title">是否为实际控制人</view>
					<view class="content" style="background: #FFFFFF;">
						<radio-group @change="radioChange" class="radio-box">
								<view class="radio" >
										<radio value="1" :checked="true" color="#03A69A" />
										<view>是</view>
								</view>
								<view class="radio" >
										<radio value="2" :checked="false" color="#03A69A" />
										<view>否</view>
								</view>
						</radio-group>
					</view>
				</view>
				<view class="form-item" v-if="!form.controller">
					<view class="title">实际控制人姓名</view>
					<view class="content">
						<input type="text" v-model="form.c_name"  placeholder="请输入实际控制人姓名" placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="form-item" v-if="!form.controller">
					<view class="title">实际控制人手机号码</view>
					<view class="content">
						<input type="text" v-model="form.c_phone"  placeholder="请输入实际控制人手机号码" placeholder-class="input-placeholder" />
					</view>
				</view>
				<view class="form-item" v-if="!form.controller">
					<view class="title">实际控制人身份证号码</view>
					<view class="content">
						<input type="text" v-model="form.c_idcard"  placeholder="请输入实际控制人身份证号码" placeholder-class="input-placeholder" />
					</view>
				</view>
			</view>
			<view class="submit" hover-class="button-hover">确定</view>
			<view style="height: 200rpx"></view>
		</scroll-view>
	</view>
</template>

<script>
	import {areaAndMouth} from '../../api/store.js'
	export default {
		
		data() {
			return {
				action: 'http://www.example.com',
				index: 0,
				showUploadList: false,
				array: ['静态','静态','静态','静态'],
				areaAndMouths: [],
				mouths: [],
				area: {
					area_name: "",
					id: '',
					child: [
						{
							area_id: '',
							id: '',
							mouth_name: "请先选择区域"
						}
					]
				},
				mouth: {
					area_id: '',
					id: '',
					mouth_name: ""
				},
				form:{
					area: '',
					mouth: '',
					name: '',
					sex: 1,
					phone: '',
					idcard: '',
					address: '',
					idcard_font: '',
					idcard_back: '',
					license: '',
					controller: true,
					c_name: '',
					c_phone: '',
					c_idcard: '',
				},
				rules: {
					area: { required: true, msg: '请选择店铺' },
					mouth: { required: true, msg: '请选择档口' },
					name: { required: true, msg: '请填写姓名' },
					phone: { required: true, msg: '请输入手机号码' },
					idcard: { required: true, msg: '请输入身份证号码' },
					address: { required: true, msg: '请输入身份证地址' },
					idcard_font: { required: true, msg: '请上传身份证人像面' },
					idcard_back: { required: true, msg: '请上传身份证国徽面' },
					license: { required: true, msg: '请上传营业执照照片' },
				}
			}
		},
		onLoad() {
			this.getAreaAndMouth()
		},
		methods:{
			async getAreaAndMouth(){
				const res = await areaAndMouth()
				this.areaAndMouths = res.data
			},
			areaChange(e){
				console.log(e)
				this.area = this.areaAndMouths[e.detail.value]
				this.mouths = this.areaAndMouths[e.detail.value].child
			},
			mouthChange(e){
				this.mouth = this.mouths[e.detail.value]
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
			.sex{
				color: #FFFFFF;
			}
			.choose{
				position: absolute;
				z-index: 1;
				width: 300rpx;
				height: 70rpx;
				background: #03A69A;
				box-shadow: 0rpx 1rpx 6rpx rgba(6, 48, 45, 0.21);
				border-radius: 4rpx;
				top: 10rpx;
				left: 10rpx;
				transition: all .3s;
			}
			.left{
				left: -20rpx;
			}
			.right{
				left: 345rpx
			}
		}
		.radio-box{
			display: flex;
			align-items: center;
			.radio{
				height: 90rpx;
				width: 345rpx;
				justify-content: center;
				display: flex;
				align-items: center;
			}
		}
	}
	.upload-list{
		display: flex;
	}
	.upload-button{
		width: 330rpx;
		height: 227rpx;
		background: #FFFFFF;
		border: 4rpx dashed #F8F8F8;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.icon{
			width: 120rpx;
			height: 120rpx;
		}
		.tips{
			font-size: 36rpx;
			font-weight: 500;
			line-height: 61rpx;
			color: #DCDCDD;
		}
	}
	.upload-button-license{
		width: 690rpx;
		height: 330rpx;
		background: #FFFFFF;
		border: 4rpx dashed #F8F8F8;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
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
