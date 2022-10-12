<template>
  <view>
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>
    
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        
      };
    },
    methods:{
      async chooseAddress(){
        const [err,succ] = await uni.chooseAddress().catch(err => err)
        if(err === null && succ.errMsg === 'chooseAddress:ok'){
          this.updateAddress(succ)
        }
        console.log(err);
        // if(err && err.errMsg === 'chooseAddress:fail the api need to be declared in the requiredPrivateInfos field in app.json/ext.json'){
        //   console.log('需要重新授权');
        //   this.reAuth()
        // } 
      },
      ...mapMutations('m_user',['updateAddress']),
      // async reAuth() {
      //   const [err2, confirmResult] = await uni.showModal({
      //     content: '检测到您没打开地址权限，是否去设置打开？',
      //     confirmText: "确认",
      //     cancelText: "取消",
      //   })
      //   if (err2) return
      //   if (confirmResult.cancel) return uni.$showMessage('您取消了地址授权！')
      //   if (confirmResult.confirm) return uni.openSetting({
      //     success: (settingResult) => {
      //       if (settingResult.authSetting['scope.address']) return uni.$showMessage('授权成功！请选择地址')
      //       if (!settingResult.authSetting['scope.address']) return uni.$showMessage('您取消了地址授权！')
      //     }
      //   })
      // }
    },
    computed:{
      ...mapGetters('m_user',['addstr']),
      ...mapState('m_user',['address'])
    }
  }
</script>

<style lang="scss">
.address-choose-box{
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  .btnChooseAddress{}
}

.address-info-box{
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  .row1{
    display: flex;
    justify-content: space-between;
    .row1-right{
      display: flex;
      justify-content: space-between;
    }
  }
  .row2{
    display: flex;
    align-items: center;
    margin-top: 10px;
    .row2-left{
      white-space: nowrap;
    }
  }
}

.address-border{
  display: block;
  width: 100%;
  height: 5px;
}
</style>