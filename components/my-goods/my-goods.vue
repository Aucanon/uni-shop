<template>
  <view>
    <view class="goods-item">
      <!-- left -->
      <view class="goods-item-left">
        <image :src="item.goods_small_logo || defaultImg" mode="" class="goods-img"></image>
      </view>
      <!-- right -->
      <view class="goods-item-right">
        <view class="goods-name">{{item.goods_name}}</view>
        <view class="goods-info">
          <view class="goods-price">￥{{item.goods_price | tofixed}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    data() {
      return {
        defaultImg:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props:{
      item:{
        type:Object,
        default:{}
      }
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    margin-right: 5px;
    .goods-img{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info{
      .goods-price{
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>