<!--
 * @Date: 2021-10-14 17:24:16
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-28 15:02:23
-->
<template>
  <view class="page">
    <view style="height: calc(100vh - 50px - env(safe-area-inset-bottom))" class="content">
      <image class="bg" src="../../static/background.jpg" mode="widthFix" style="width: 750rpx; height: 491rpx"></image>
      <!-- <view style="height: 176rpx;"></view> -->
      <view class="info">
        <image :src=" userInfo.headpic" mode="heightFix" class="head-pic"></image>
        <view class="name">
          <view class="title">{{ userInfo.nick_name }}</view>
          <view class="phone">{{ userInfo.phone }}</view>
        </view>
      </view>
      <view class="list" style="flex: 1; margin-bottom: 45rpx">
        <view class="tabs">
          <view class="tab-item" v-for="(item, index) in tabList" :key="item.name" :class="listIndex == index ? 'choose' : ''" :style="{ marginRight: item.margin + 'rpx', width: item.width + 'rpx' }" @click="chooseType(index)">
            {{ item.name }}
          </view>
          <view class="line" :style="{ left: tabList[listIndex].left + 'rpx', width: tabList[listIndex].width + 'rpx' }"></view>
        </view>
        <!-- 内容列表 -->
        <view class="content-list" style="margin-top: 30rpx">
          <view style="height: 100%" v-if="!loginStatus">
            <u-empty text="暂未登录" mode="permission">
              <u-button slot="bottom">立即登录</u-button>
            </u-empty>
          </view>
          <swiper v-else style="height: 100%" :indicator-dots="false" :autoplay="false" :current="listIndex" @change="listChange">
            <!-- 我的店铺（员工店主看到的状态不同） -->
            <swiper-item @touchmove.stop="stopTouchMove">
              <z-paging ref="paging" :fixed="false" height="100%" v-model="dataList" @query="getData" :default-page-size="3" :auto-show-back-to-top="false" :refresher-end-bounce-enabled="true" :refresher-complete-delay="300">
                <view class="store" v-for="(item, index) in dataList" :key="index">
                  <view class="title-line">
                    <view class="store-title">{{ item.mouth_name }}</view>
                    <image src="/static/delete.png" mode="heightFix" style="height: 33rpx" v-if="item.status == 1"></image>
                    <view class="wait" v-if="item.status == 0">审核中...</view>
                    <view class="fail" v-if="item.status == 2">已拒绝</view>
                  </view>
                  <view class="content-line">
                    <view class="store-content">{{ item.area_name }}</view>
                    <image src="/static/edit.png" mode="heightFix" style="height: 33rpx"></image>
                  </view>
                </view>
              </z-paging>
            </swiper-item>
            <!-- 缴费人员管理（仅店主） -->
            <swiper-item @touchmove.stop="stopTouchMove">
              <z-paging ref="paging2" :fixed="false" height="100%" :refresher-enabled="false" :loading-more-enabled="false">
                <pending-staff ref="pending" :page-list="pendingStaffs" @done="getStaffData"></pending-staff>
                <Staff ref="staff" :page-list="staffs"></Staff>
              </z-paging>
            </swiper-item>
          </swiper>
        </view>
        <!-- 添加按钮 -->
        <view class="add-item" hover-class="button-hover" @click="newStore">
          <image src="../../static/add.png" mode="heightFix" style="height: 36rpx"></image>
        </view>
      </view>
    </view>

    <u-tabbar :list="tabbar" :mid-button="true" active-color="#03A69A" inactive-color="#BEBEBE"></u-tabbar>
  </view>
</template>

<script>
import PendingStaff from '../../components/PendingStaff.vue'
import Staff from '../../components/Staff.vue'
import { mapGetters } from 'vuex'
import { storeList, staffList } from '../../api/store.js'
export default {
  components: {
    PendingStaff,
    Staff,
  },
  computed: {
    ...mapGetters(['loginStatus','userInfo']),
  },
  data() {
    return {
      tabbar: '',
      listIndex: 0,
      tabList: [
        { name: '我的店铺', width: 160, margin: 40, left: 0 },
        { name: '缴费人员管理', width: 240, margin: 0, left: 200 },
      ],
      dataList: [],
			pendingStaffs: [],
			staffs: []
    }
  },
  onLoad() {
    this.tabbar = this.$store.state.tabbar
  },
  methods: {
    chooseType(index) {
      this.listIndex = index
    },
    async getData(pageNo, pageSize) {
			console.log(this.$store.state.permission)
		  const res =	await storeList(pageNo, pageSize, this.$store.state.permission)
      this.$refs.paging.complete(res.data)
    },
    async listChange(e) {
      this.listIndex = e.detail.current
			if(e.detail.current == 1){
				this.getStaffData()
			}
    },
		async getStaffData(){
			const res = await staffList()
			this.pendingStaffs = res.data.no
			this.staffs = res.data.yes
		},
    newStore() {
      if (this.$store.getters.loginStatus) {
        uni.navigateTo({ url: '/pages/form/form' })
      } else {
        const that = this
        uni.showModal({
          title: '提示',
          content: '您还没有登录',
          success: function (res) {
            if (res.confirm) {
              that.$store.dispatch('login')
            }
          },
        })
      }
    },
    stopTouchMove() {},
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  overflow: hidden;
}
.content {
  display: flex;
  flex-direction: column;
}
.info {
  position: relative;
  width: 690rpx;
  height: 260rpx;
  background: #ffffff;
  box-shadow: 0rpx 10rpx 20rpx rgba(0, 0, 0, 0.04);
  border-radius: 20rpx;
  margin: -315rpx auto 0;
  z-index: 999;
  display: flex;
  padding: 46rpx 33rpx;
  align-items: center;
}
.head-pic {
  width: 160rpx;
  height: 160rpx;
  background: rgba(0, 0, 0, 0);
  box-shadow: 0rpx 3rpx 20rpx rgba(5, 28, 46, 0.2);
  border-radius: 30rpx;
}
.name {
  margin-left: 33rpx;
  .title {
    font-size: 50rpx;
    font-weight: bold;
    line-height: 50rpx;
    color: #333333;
    text-shadow: 0rpx 3rpx 2rpx rgba(0, 0, 0, 0.16);
  }
  .phone {
    font-size: 28rpx;
    font-weight: 500;
    line-height: 28rpx;
    color: #666666;
    text-shadow: 0rpx 3rpx 2rpx rgba(0, 0, 0, 0.16);
    margin-top: 19rpx;
  }
}
.list {
  position: relative;
  z-index: 9;
  width: 690rpx;
  // height: 1053rpx;
  background: #ffffff;
  box-shadow: 0rpx 10rpx 20rpx rgba(0, 0, 0, 0.04);
  border-radius: 30rpx;
  margin: 33rpx auto 0;
  // padding: 30rpx;
  padding-top: 30rpx;
  display: flex;
  flex-direction: column;
  .tabs {
    margin-left: 30rpx;
    position: relative;
    display: flex;
    width: 440rpx;
    .tab-item {
      width: 160rpx;
      font-size: 40rpx;
      font-weight: 500;
      // line-height: 68rpx;
      color: #999999;
    }
    .choose {
      font-weight: bold;
      color: #333333;
    }
    .line {
      position: absolute;
      width: 160rpx;
      height: 10rpx;
      background: #02a59a;
      border-radius: 10rpx;
      top: 63rpx;
      left: 0;
      transition: all 0.3s;
      transform: translate3d(0, 0, 0);
      will-change: transform;
    }
  }
  .add-item {
    position: absolute;
    z-index: 999;
    right: -4rpx;
    top: -4rpx;
    width: 130rpx;
    height: 97rpx;
    background: #ffffff;
    box-shadow: 0rpx 3rpx 10rpx rgba(10, 38, 75, 0.17);
    border-radius: 2rpx 30rpx 2rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-list {
    flex: 1;
  }
}
.store {
  width: 630rpx;
  height: 200rpx;
  background: #ffffff;
  box-shadow: 0rpx 5rpx 20rpx rgba(4, 5, 32, 0.07);
  border-radius: 30rpx;
  margin: 0 auto 30rpx;
  padding: 27rpx;
  .title-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .store-title {
      font-size: 73rpx;
      font-weight: bold;
      color: #333333;
    }
  }
  .content-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .store-content {
      font-size: 32rpx;
      font-weight: 500;
      color: #708e8e;
    }
  }
  .wait {
    font-size: 25rpx;
    font-weight: 500;
    line-height: 43rpx;
    color: #02a59a;
  }
  .fail {
    font-size: 25rpx;
    font-weight: 500;
    line-height: 43rpx;
    color: #ff5757;
  }
}
</style>
