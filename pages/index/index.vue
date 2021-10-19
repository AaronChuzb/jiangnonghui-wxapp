<template>
  <view class="page">
    <scroll-view scroll-y="true" style="height: calc(100vh - 50px)">
      <image src="../../static/background.jpg" mode="widthFix" style="width: 750rpx; height: 491rpx"></image>
      <view class="banner">
        <u-swiper :list="swiperList" mode="none" border-radius="30" height="330"></u-swiper>
      </view>
      <view class="content">
        <view class="notice">
          <view class="icon">
            <image src="../../static/natice.png" mode="widthFix" style="width: 40rpx; height: 40rpx"></image>
          </view>
          <view class="text"> 即将到截止日，请尽快缴费！ </view>
          <view class="all" @click="viewAll"> 查看全部 </view>
        </view>
        <!-- 富文本内容，演示用过期删除 -->
        <view class="rich-text">
          <view class="title"> 网页栅格系统的必要性 </view>
          <view class="sub-title"> 1.更专业 </view>
          <view class="sub-content"> 使设计有迹可循，具有逻辑性，同时也更规范，减少设计中的尺寸计算和无效尝试，设计师可以将更多的精力放在设计本身。 </view>
          <image class="image" src="../../static/picture.jpg" mode="widthFix"></image>
          <view class="sub-title"> 2.更高效 </view>
          <view class="sub-content"> 统一设计规范，减少决策时间，使沟通更高效。 </view>
          <view class="sub-title"> 3.布局更方便 </view>
          <view class="sub-content"> 特别是对响应式布局，能够使不同设备上呈现的界面更具统一性。 </view>
        </view>
      </view>
      <view class="contact">
        <image src="/static/phone.png" mode="heightFix" style="height: 40rpx; margin-left: 30rpx"></image>
        <view class="phone"> 156-9854-5236 </view>
        <image @click="copy" src="/static/copy.png" mode="heightFix" style="height: 30rpx; margin-right: 30rpx"></image>
      </view>
      <view class="placeholder"></view>
    </scroll-view>
    <u-tabbar :list="tabbar" :mid-button="true" active-color="#03A69A" inactive-color="#BEBEBE"></u-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabbar: '',
      swiperList: ['/static/banner.jpg'],
    }
  },
  onLoad() {
    this.tabbar = this.$store.state.tabbar
  },
  methods: {
    copy() {
      console.log()
      uni.setClipboardData({
        data: '156-9854-5236', //要被复制的内容
        success: function () {
          //重点~做笔记
          //在success中加入uni.hideToast()可以解决
          uni.showToast({
            title: '复制成功',
            icon: 'none',
          })
          //以下就可自定义操作了~
        },
        fail: function (err) {
          uni.showToast({
            title: '复制失败',
            icon: 'none',
          })
        },
      })
    },
    viewAll(){
      uni.navigateTo({ url: '/pages/placard/placard' })
    }
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
.banner {
  width: 690rpx;
  margin: 40rpx auto 0;
}
.content {
  padding: 30rpx 0;
  width: 690rpx;
  //height: 1006rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
  margin: 36rpx auto 30rpx;
  .notice {
    margin: 0 auto 0;
    width: 630rpx;
    height: 70rpx;
    background: #eb2b2b;
    box-shadow: 0px 10rpx 30rpx rgba(228, 39, 39, 0.28);
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    .icon {
      width: 60rpx;
      height: 60rpx;
      background: #ffffff;
      border-radius: 16rpx;
      margin-left: 5rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text {
      font-size: 28rpx;
      color: #ffffff;
      margin: 0 20rpx;
      flex: 1;
    }
    .all {
      font-size: 20rpx;
      color: #ffffff;
      margin-right: 20rpx;
    }
  }
  .rich-text {
    width: 630rpx;
    margin: 0 auto;
    padding-top: 40rpx;
    .title {
      font-size: 50rpx;
      font-weight: bold;
      line-height: 50rpx;
      color: #333333;
    }
    .sub-title {
      margin: 40rpx 0 20rpx 0;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 32rpx;
      color: #333333;
    }
    .sub-content {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 42rpx;
      color: #858585;
    }
    .image {
      width: 630rpx;
      height: 260rpx;
      border-radius: 4rpx;
      margin-top: 40rpx;
    }
  }
}
.contact {
  margin: 0 auto 100rpx;
  width: 690rpx;
  height: 100rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.16);
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  .phone {
    flex: 1;
    margin: 0 30rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #334148;
  }
}
</style>
