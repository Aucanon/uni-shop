<template>
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
  
  
    <view class="amount-box">
      合计：<text class="amount">￥{{checkGoodsAmount}}</text>
    </view>
    
    <view class="btn-settle" @click="settlement">结算({{checkCount}})</view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds:3,
        timer:null
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkCount','total','checkGoodsAmount']),
      ...mapGetters('m_user',['addstr']),
      ...mapState('m_user',['token']),
      ...mapState('m_cart',['cart']),
      isFullCheck(){
        return this.total === this.checkCount
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      changeAllState(){
        this.updateAllGoodsState(!this.isFullCheck)
      },
      settlement(){
        if(!this.checkCount) return uni.$showMessage('请选择要结算的商品！')
        
        if(!this.addstr) return uni.$showMessage('请选择收货地址！')
        
        // if(!this.token) return uni.$showMessage('请先登录！')
        if(!this.token) return this.delayNavigator()
        this.payOrder()
        
      },
      showTips(n){
        uni.showToast({
          icon:'none',
          title:'请登录后再结算'+ n + '秒后自动跳转到登录页！',
          mask:true,
          duration:1500
        })
      },
      delayNavigator(){
        this.seconds = 3
        this.showTips(this.seconds)
        this.timer = setInterval(() => {
          this.seconds--
          if(this.seconds <= 0){
            clearInterval(this.timer)
            uni.switchTab({
              url:'/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType:'swichTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        },1000)
      },
      async payOrder(){
        const orderInfo = {
          // order_price:this.checkGoodsAmount,
          order_price:0.01,
          consignee_addr:this.addstr,
          goods:this.cart.filter(x => x.goods_state).map(x => ({
            goods_id:x.goods_id,
            goods_number:x.goods_count,
            goods_price:x.goods_price
          }))
        }
        const {data:result} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
        if(result.meta.status !== 200) return uni.$showMessage('创建订单失败！')
        const orderNumber = result.message.order_number
        const {data:result2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
        if(result2.meta.status !== 200) return uni.$showMessage('预付订单生成失败！')
        const payInfo = result2.message.pay
        
        const [err,succ] = await uni.requestPayment(payInfo)
        console.log(err);
        if(err) return uni.$showMessage('订单支付失败！')
        const {data:result3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
        if(result3.meta.status !== 200) return uni.$showMessage('订单未支付！')
        uni.showToast({
          icon:'success',
          title:'订单支付完成！'
        })
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  .radio{
    display: flex;
    align-items: center;
  }
  .amount-box{
    .amount{
      color: #C00000;
      font-weight: bold;
    }
  }
  .btn-settle{
    background-color: #C00000;
    color: white;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>