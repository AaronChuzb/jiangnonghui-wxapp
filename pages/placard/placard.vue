<!--
 * @Date: 2021-10-14 17:26:49
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-19 14:44:25
-->
<template>
  <view class="page">
    <z-paging ref="paging" v-model="dataList" @query="getData" :default-page-size="8" :auto-show-back-to-top="true" :refresher-end-bounce-enabled="true" :refresher-complete-delay="300">
      <view style="height: 49rpx"></view>
      <view class="item" v-for="(item, index) in dataList" :key="item.create_time" @click="showDetail(index)">
        <view class="title-box">
          <view class="title">{{ item.title }}</view>
          <view class="date">{{ item.create_time }}</view>
        </view>
        <view class="content">{{item.message }}</view>
      </view>
    </z-paging>
    <uni-popup ref="popup" type="center">
      <view class="detail">
        <view class="close" @click="$refs.popup.close()">
          <view>+</view>
        </view>
        <view class="title">{{ message.title }}</view>
        <view class="date-box">{{ message.create_time }}</view>
        <view class="content-box">{{ message.message }}</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
	import {message} from "../../api/index.js"
export default {
  data() {
    return {
      dataList: [],
			message:{}
    }
  },
  onLoad(options) {},
  methods: {
    async getData(pageNo, pageSize) {
			const res = await message(pageNo, pageSize, 2, '')
      this.$refs.paging.complete(res.data)
    },
    showDetail(index) {
			this.message = this.dataList[index]
      this.$refs.popup.open()
    },
  },
}
</script>

<style lang="scss">
.item {
  margin: 0 auto 40rpx;
  width: 690rpx;
  height: 214rpx;
  background: #ffffff;
  box-shadow: 0rpx 3rpx 10rpx rgba(4, 5, 32, 0.1);
  border-radius: 10rpx;
  padding: 35rpx 30rpx;
}
.title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 54rpx;
    font-weight: bold;
    color: #334148;
    line-height: 54rpx;
  }
  .date {
    font-size: 28rpx;
    font-weight: 500;
    color: #c1c6c8;
  }
}
.content {
  margin-top: 47rpx;
  font-size: 32rpx;
  line-height: 32rpx;
  font-weight: 400;
  color: #6f797e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail {
  position: relative;
  margin: 0 auto;
  width: 690rpx;
  min-height: 496rpx;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 20prx rgba(8, 10, 55, 0.1);
  border-radius: 10rpx;
  padding: 44rpx 0;
  .title {
    font-size: 44rpx;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  .date-box {
    margin: 66rpx auto 22rpx;
    width: 630rpx;
    height: 70rpx;
    background: #f8f8f8;
    border-radius: 10rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    line-height: 70rpx;
    padding-left: 26rpx;
  }
  .content-box {
    width: 630rpx;
    min-height: 181rpx;
    background: #f8f8f8;
    border-radius: 10rpx;
    margin: 0 auto;
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
    padding: 33rpx 26rpx;
  }
  .close {
    position: absolute;
    width: 48rpx;
    height: 48rpx;
    background: #d63131;
    border-radius: 50%;
    right: 30rpx;
    top: 30rpx;
    color: #ffffff;
    font-size: 50rpx;
    text-align: center;
    line-height: 40rpx;
    transform: rotate(45deg);
    font-weight: bold;
  }
}
</style>
