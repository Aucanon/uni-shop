<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <text class="tips-text">登录后尽享更多权益！</text>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods:{
      getUserProfile(){
        uni.getUserProfile({
          desc:'用于登录购物车',
          success: (res) => {
            uni.$showMessage('登录授权成功！')
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: (res) => {
            console.log(res);
            uni.$showMessage('授权失败！')
          }
        })
      },
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
      async getToken(info){
        const[err,res] = await uni.login().catch(err => err)
        if(err || res.errMsg !== 'login:ok') return uni.$showMessage('登陆失败！')
        const query = {
          code:res.code,
          encryptedData:info.encryptedData,
          iv:info.iv,
          rawData:info.rawData,
          signature:info.signature
        }
        const {data:result} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
        if(result.meta.status === 200) return uni.$showMessage('登陆失败！')
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
        this.navigateBack()
      },
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType ==='swichTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    },
    computed:{
      ...mapState('m_user',['redirectInfo'])
    }
  }
</script>

<style lang="scss">
.login-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 750rpx;
  background-color: white;
  position: relative;
  overflow: hidden;
  &::after{
    content: '';
    display: block;
    width: 100%;
    height: 40px;
    background-color: #f8f8f8;
    position: absolute;
    bottom: 0;
    left:0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .btn-login{
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #C00000;
  }
  .tips-text{
    font-size: 12px;
    color: gray;
  }
}
</style>