<template>
  <view class="card">
    <view class="title-box">
      <view class="title">我的员工</view>
      <view class="num">2</view>
    </view>
    <u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="index" @click="click" @open="open" :options="options">
      <view class="item">
        <image src="../static/avatar.png" mode="widthFix" class="avatar"></image>
        <view class="right-wrap" :style="{borderBottom: index == 1?'none':'2rpx solid #F8F8F8'}">
					<view class="name-line">
						<view class="name">{{item.name}}</view>
						<view class="area">商务区 <text>A01</text></view>
					</view>
          <view class="phone">{{ item.phone }}</view>
        </view>
      </view>
    </u-swipe-action>
  </view>
</template>

<script>
export default {
  name: 'PendingStaff',
  data() {
    return {
      list: [
        {
          id: 0,
          name: '张三',
          phone: '13526985452',
          images: '/static/avatar',
          show: false,
        },
        {
          id: 1,
          name: '张三',
          phone: '13526985452',
          images: '/static/avatar',
          show: false,
        }
      ],
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#F9E8E8',
            color: '#FF5757'
          },
        },
      ],
    }
  },
  methods: {
    open(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.list[index].show = true
      this.list.map((val, idx) => {
        if (index != idx) this.list[idx].show = false
      })
    },
  },
}
</script>

<style lang="scss">
.card {
  width: 630rpx;
  min-height: 500rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.1);
  border-radius: 30rpx;
  margin: 30rpx auto 30rpx;
  //
  .title-box {
    height: 94rpx;
    display: flex;
    padding: 0 28rpx;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4rpx solid #f8f8f8;
    .title {
      font-size: 28rpx;
      font-weight: bold;
      line-height: 28rpx;
      color: #333333;
    }
    .num {
      font-size: 28rpx;
      font-weight: 500;
      line-height: 28rpx;
      color: #03a69a;
    }
  }
  .item {
    height: 193rpx;
    display: flex;
    align-items: flex-start;
    width: 602rpx;
    margin-left: 30rpx;
    padding-top: 42rpx;
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 4rpx;
    }
    .right-wrap {
      width: 452rpx;
      padding-bottom: 51rpx;
      margin-left: 30rpx;
      border-bottom: 2rpx solid #f8f8f8;
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
					line-height: 32rpx;
					font-weight: 500;
					line-height: px;
					color: #333333;
					opacity: 1;
					text{
						font-weight: bold;
					}
				}
			}
      .phone {
				margin-top: 36rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 28rpx;
        color: #999999;
      }
    }
  }
}
</style>
