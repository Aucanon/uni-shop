<template>
  <view v-if="goodsInfo.goods_name" class="goods-detail-container">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    
    <view class="goods-info-box">
      <view class="price">￥{{goodsInfo.goods_price}}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{goodsInfo.goods_name}}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递：免运费</view>
    </view>
    
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    
    <view class="goods-nav">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsInfo:[],
        options: [{
        					icon: 'shop',
        					text: '店铺',
        					infoBackgroundColor: '#007aff',
        					infoColor: "#f5f5f5"
        				}, {
        					icon: 'cart',
        					text: '购物车',
        					info: 2
        				}],
        				buttonGroup: [{
        						text: '加入购物车',
        						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
        						color: '#fff'
        					},
        					{
        						text: '立即购买',
        						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
        						color: '#fff'
        					}
        				],
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods:{
      async getGoodsDetail(goods_id){
        const {data:result} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        if(result.meta.status !== 200) return uni.$showMessage()
        result.message.goods_introduce = result.message.goods_introduce.replace(/<img /g,'<img style="display:block;"')
        this.goodsInfo = result.message
      },
      preview(i){
        uni.previewImage({
          current:i,
          urls:this.goodsInfo.pics.map(x => x.pics_big)
        })
      },
      onClick(e){
        if(e.content.text === '购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 750rpx;
  image{
    height: 100%;
    width: 100%;
  }
}

.goods-info-box{
  padding: 10px;
  padding-right: 0;
  .price{
    color: #C00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body{
    display: flex;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
      margin-right: 10px;
    }
    .favi{
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf{
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}
.goods-nav{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
}
.goods-detail-container{
  padding-bottom: 50px;
}
</style>
