<!--
 * @Date: 2021-10-14 17:24:43
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-20 18:33:15
-->
<template>
  <view class="page">
		<!-- 未登录状态 -->
		<view style="height: calc(100vh - 50rpx);" v-if="!loginStatus">
			<u-empty text="暂未登录" mode="permission" >
				<u-button slot="bottom" @click="$store.dispatch('login')">立即登录</u-button>
			</u-empty>
		</view>
		<!-- 登录后的列表 -->
    <scroll-view scroll-y="true" style="height: calc(100vh - 50px)">
      <view class="header">
        <!-- 标题 -->
        <view class="top" :style="{ background: statusColor }">
          <view class="area-name">商务区</view>
          <image src="../../static/pulldown_line.png" mode="widthFix" class="arrow-down"></image>
        </view>
        <!-- 日期选择 -->
        <view class="date-box">
          <picker mode="date" :end="endTime" fields="month" :value="startTime" @change="dateChange" id="1">
            <view class="start item">{{ startTime }}</view>
          </picker>
          <image src="../../static/arrow.png" mode="widthFix" class="arrow"></image>
          <picker mode="date" :start="startTime" fields="month" :value="startTime" @change="dateChange" id="2">
            <view class="end item">{{ endTime }}</view>
          </picker>
        </view>
        <!-- tabs -->
        <view class="tabs">
          <!-- 未缴费数量 -->
          <view class="tag">2</view>
          <view class="tab-item" v-for="(item, index) in tabList" :key="item.name" :class="listIndex == index ? 'choose' : ''" :style="{ marginRight: item.margin + 'rpx', width: item.width + 'rpx' }" @click="chooseType(index)">
            {{ item.name }}
          </view>
          <view class="line" :style="{ left: tabList[listIndex].left + 'rpx', width: tabList[listIndex].width + 'rpx', background: statusColor }"></view>
        </view>
      </view>

      <view class="card" v-for="(item, index) in pageData" :key="index" :class="item.show ? '' : 'card-height-min'" :style="{ borderColor: statusColor }">
        <!-- 内容顶部 -->
        <view class="top" :style="{ background: statusColor }">
          <view class="title">商务区A01</view>
          <view class="sub">
            <view class="date">2020年02月</view>
            <view class="status">{{ listIndex==0?'待缴费':'已缴费' }}</view>
          </view>
					<view class="check-box" @click="checkOrder(index)" v-if="listIndex == 0">
						<image src="../../static/select.png" mode="widthFix" :class="item.checked?'show-check':''"></image>
					</view>
        </view>
        <view class="collapse">
          <view class="collapse-title" @click="showDetail(index)">
            <view class="title-name">合计</view>
            <view class="title-content">￥9500.00</view>
          </view>
          <view class="hide" :class="item.show ? 'show' : 'hidden'">
            <view class="line">
              <view class="tile">
                <view class="line-name">租金</view>
                <view class="line-content">￥5000.00</view>
              </view>
            </view>
            <view class="line">
              <view class="tile">
                <view class="line-name">管理费</view>
                <view class="line-content">￥5000.00</view>
              </view>
            </view>
            <view class="line">
              <view class="tile">
                <view class="line-name">综合费</view>
                <view class="line-content">￥200.00</view>
              </view>
            </view>
            <!-- 电费 -->
            <view class="line">
              <view class="tile">
                <view class="line-name">电费</view>
                <view class="line-content">￥264.00</view>
              </view>
              <view class="tile">
                <view class="line-name tile-content">上月读数</view>
                <view class="line-content tile-content">256464</view>
              </view>
              <view class="tile">
                <view class="line-name tile-content">本月读数</view>
                <view class="line-content tile-content">256464</view>
              </view>
              <view class="tile">
                <view class="line-name tile-content">本月度数</view>
                <view class="line-content tile-content">256464</view>
              </view>
            </view>
            <!-- 水费 -->
            <view class="line">
              <view class="tile">
                <view class="line-name">水费</view>
                <view class="line-content">￥34.00</view>
              </view>
              <view class="tile">
                <view class="line-name tile-content">上月读数</view>
                <view class="line-content tile-content">256464</view>
              </view>
              <view class="tile">
                <view class="line-name tile-content">本月读数</view>
                <view class="line-content tile-content">256464</view>
              </view>
              <view class="tile">
                <view class="line-name tile-content">本月吨数</view>
                <view class="line-content tile-content">256464</view>
              </view>
            </view>
            <view class="line">
              <view class="tile">
                <view class="line-name">附加费</view>
                <view class="line-content">￥1000.00</view>
              </view>
            </view>
          </view>
          <view class="show-button" style="margin-bottom: 22rpx" @click="showDetail(index)">{{ item.show ? '收起' : '展开' }}明细</view>
          <!-- 缴费时间 -->
          <view class="line" style="clear: both">
            <view class="tile">
              <view class="line-name">缴费时间</view>
              <view class="line-content" style="color: #333333">2020-02-05</view>
            </view>
          </view>
          <!-- 档主 -->
          <view class="collapse-title" style="border: none">
            <view class="title-name">档主</view>
            <view class="title-content" style="color: #333333">Miss.黄</view>
          </view>
          <view class="button" hover-class="button-hover">查看发票</view>
        </view>
      </view>
      <view class="placeholder"></view>
			<view style="height: 50rpx;"></view>
    </scroll-view>
		<view class="settle" :class="(showSettleBar && listIndex == 0)?'':'hide-settle'">
			<view class="settle-content">
				<view class="left">
					<view class="check-box-all" @click="checkAllOrder()">
						<view class="check-box-all-item">
							<image src="../../static/select.png" mode="widthFix" :class="checkAll?'show-check':''"></image>
						</view>
						<view class="">全选</view>
					</view>
					<view class="price">
						<text style="font-size: 28rpx;color: #333333;">合计：</text>
						<text>￥19000.00</text>
					</view>
				</view>
				<view class="settle-button" hover-class="button-hover">缴费</view>
			</view>
      <view style="height: 1rpx;"></view>
		</view>
    <u-tabbar :list="tabbar" :mid-button="true" active-color="#03A69A" inactive-color="#BEBEBE"></u-tabbar>
  </view>
</template>

<script>
	import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tabbar: '',
      startTime: '2021-07',
      endTime: '2021-08',
      listIndex: 0,
      tabList: [
        { name: '待缴费', width: 120, margin: 60, left: 0 },
        { name: '已缴费', width: 120, margin: 0, left: 180 },
      ],
      pageData: [
        { id: 0, show: false, checked: false },
        { id: 1, show: false, checked: false },
      ],
			chooseOrderList: [],
			checkAll: false,
      statusColor: '#D95034',
			showSettleBar: false
    }
  },
	computed:{
		...mapGetters([
      'loginStatus'
    ]),
	},
  onLoad() {
    this.tabbar = this.$store.state.tabbar
  },
  methods: {
    /**
     * @description: 日期变更
     * @param {*} e
     */
    dateChange: function (e) {
      if (e.currentTarget.id === '1') {
        this.startTime = e.target.value
      } else if (e.currentTarget.id === '2') {
        this.endTime = e.target.value
      }
    },
    chooseType(index) {
      this.listIndex = index
      index == 0 ? (this.statusColor = '#D95034') : (this.statusColor = '#289F97')
    },
		checkOrder(index){
			this.pageData[index].checked = !this.pageData[index].checked
			if(this.pageData[index].checked){
				this.chooseOrderList.push(index)
			} else {
				this.chooseOrderList.splice(this.chooseOrderList.indexOf(index), 1)
			}
			// 是否显示结算的bar
			if(this.chooseOrderList.length > 0){
				this.showSettleBar = true
			} else {
				this.showSettleBar = false
			}
			// 是否判断为全选
			if(this.chooseOrderList.length == this.pageData.length){
				this.checkAll = true
			} else {
				this.checkAll = false
			}
		},
		checkAllOrder(){
			this.checkAll = !this.checkAll
			this.chooseOrderList = []
			if(this.checkAll){
				this.pageData.forEach((item, index)=>{
					this.chooseOrderList.push(index)
					this.pageData[index].checked = true
				})
			} else {
				this.pageData.forEach((item, index)=>{
					this.pageData[index].checked = false
				})
				this.showSettleBar = false
			}
		},
    showDetail(index) {
      this.pageData[index].show = !this.pageData[index].show
    },
		
  },
}
</script>

<style lang="scss">
page {
  height: 100%;
}
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  width: 690rpx;
  height: 290rpx;
  background: #ffffff;
  box-shadow: 0rpx 5rpx 20rpx rgba(4, 5, 32, 0.07);
  border-radius: 30rpx;
  margin: 30rpx auto 50rpx;
  .top {
    height: 80rpx;
    background: #02a59a;
    border-radius: 30rpx 30rpx 0rpx 0rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    .area-name {
      font-size: 32rpx;
      font-weight: bold;
      line-height: 32rpx;
      color: #fbfbfb;
    }
    .arrow-down {
      width: 32rpx;
      height: 32rpx;
    }
  }
  .date-box {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .arrow {
      width: 32rpx;
      height: 32rpx;
    }
    .item {
      font-size: 48rpx;
      font-weight: bold;
      line-height: 48rpx;
      color: #334148;
    }
    .start {
      margin-left: 60rpx;
    }
    
    .end {
      margin-right: 60rpx;
    }
  }
  .tabs {
    margin-top: 48rpx;
    margin-left: 60rpx;
    position: relative;
    display: flex;
    width: 440rpx;
    .tab-item {
      width: 120rpx;
      font-size: 40rpx;
      font-weight: 500;
      // line-height: 68rpx;
      color: #999999;
    }
    .choose {
      font-weight: bold;
      color: #333333;
    }
    .tag {
      width: 50rpx;
      height: 32rpx;
      background: #ff5757;
      border-radius: 20rpx;
      text-align: center;
      line-height: 32rpx;
      font-size: 20rpx;
      font-weight: 500;
      color: #ffffff;
      position: absolute;
      left: 95rpx;
      top: -16rpx;
    }
    .line {
      position: absolute;
      width: 160rpx;
      height: 10rpx;
      background: #02a59a;
      border-radius: 10rpx;
      top: 70rpx;
      left: 0;
      transition: all 0.3s;
      transform: translate3d(0, 0, 0);
      will-change: transform;
    }
  }
}
.card {
  width: 690rpx;
  // min-height: 584rpx;
  height: 1215rpx;
  background: #ffffff;
  border: 4rpx solid #c0e3e1;
  border-radius: 30rpx;
  margin: 0 auto 30rpx;
  padding-bottom: 36rpx;
  transition: all 0.3s;
  transform: translate3d(0 0 0);
  will-change: transform;
  transform-origin: top;
  .top {
    // width: 690rpx;
		position: relative;
    margin-left: -1rpx;
    margin-top: -2rpx;
    height: 158rpx;
    background: #289f97;
    border-radius: 30rpx 30rpx 0rpx 0rpx;
    padding: 30rpx 30rpx;
		.check-box{
			position: absolute;
			width: 60rpx;
			height: 60rpx;
			background: #FFFFFF;
			border-radius: 50%;
			top: 16rpx;
			right: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 48rpx;
				height: 35rpx;
				display: none;
			}
			.show-check{
				display: block;
			}
		}
    .title {
      font-size: 50rpx;
      font-weight: bold;
      line-height: 50rpx;
      color: #ffffff;
    }
    .sub {
      margin-top: 18rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date {
        font-size: 28rpx;
        font-weight: 500;
        line-height: 28rpx;
        color: #ffffff;
      }
      .status {
        font-size: 32rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #ffffff;
      }
    }
  }
  .collapse {
    // position: relative;
    padding: 0 30rpx;

    .collapse-title {
      height: 76rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2rpx solid #f1f1f1;
      .title-name {
        font-size: 32rpx;
        font-weight: 400;
        line-height: 32rpx;
        color: #8a8c90;
      }
      .title-content {
        font-size: 32rpx;
        font-weight: bold;
        line-height: 32rpx;
        color: #333333;
      }
    }
    .hide {
      // position: relative;
      overflow: hidden;
      transition: all 0.3s;
      transform: translate3d(0 0 0);
      will-change: transform;
      transform-origin: top;
    }
    .show {
      height: 590rpx;
    }
    .hidden {
      height: 0;
    }
    .line {
      .tile {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      min-height: 70rpx;
      padding: 21rpx 0;
      border-bottom: 2rpx solid #f1f1f1;
      .line-name {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: #8a8c90;
      }
      .line-content {
        font-size: 28rpx;
        font-weight: bold;
        line-height: 28rpx;
        color: #333333;
      }
      .tile-content {
        font-size: 24rpx;
        margin-top: 12rpx;
        color: #b1b1b1;
      }
    }
    .show-button {
      font-size: 24rpx;
      font-weight: 400;
      color: #516566;
      line-height: 24rpx;
      margin-top: 18rpx;
      float: right;
    }
    .button {
      margin-top: 34rpx;
      width: 630rpx;
      height: 80rpx;
      background: #ffffff;
      border: 4rpx solid #e3e4e8;
      border-radius: 20rpx;
      text-align: center;
      line-height: 80rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #a3a6b4;
    }
  }
}
.card-height-min {
  height: 614rpx;
}
.settle{
	position: fixed;
	width: 750rpx;
  overflow: hidden;
	transition: all .3s;
  height: calc(50px + 64rpx + env(safe-area-inset-bottom));
	background: #FFFFFF;
	box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.16);
	z-index: 9999999999;
	bottom: 0;
	left: 0;
	right: 0;
  padding-bottom: env(safe-area-inset-bottom);
  .settle-content{
		position: relative;
		display: flex;
    .check-box-all{
			margin-top: 30rpx;
			margin-left: 30rpx;
			display: flex;
			align-items: center;
			.check-box-all-item{
				margin-right: 21rpx;
				width: 50rpx;
				height: 50rpx;
				border: 3rpx solid #D95034;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 48rpx;
					height: 35rpx;
					display: none;
				}
				.show-check{
					display: block;
				}
			}
		}
		.price{
			margin-top: 26rpx;
			margin-left: 30rpx;
			font-size: 46rpx;
			font-weight: 500;
			color: #D95034;
		}
	}
	.settle-button{
		position: absolute;
		right: 30rpx;
		top: 52rpx;
		width: 220rpx;
		height: 95rpx;
		background: #D95034;
		border-radius: 12rpx;
		font-size: 46rpx;
		font-weight: 500;
		line-height: 95rpx;
		color: #FFFFFF;
		text-align: center;
	}
}
.hide-settle{
	height: 0;
	padding: 0;
}

</style>
