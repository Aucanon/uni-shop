<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" mode="" class="nav-img"></image>
      </view>
    </view>
    <!-- floor -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width + 'rpx'}"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList(),
      this.getNavList(),
      this.getFloorList()
    },
    methods:{
      async getSwiperList(){
        const {data:result} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(result.meta.status !== 200){
          return uni.$showMessage()
        }
        // console.log(result);
        this.swiperList = result.message
      },
      async getNavList(){
        const {data:result} = await uni.$http.get('/api/public/v1/home/catitems')
        if(result.meta.status !== 200){
          return uni.$showMessage()
        }
        this.navList = result.message
      },
      navClickHandler(item){
        if(item.name == '分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      async getFloorList(){
        const {data:result} = await uni.$http.get('/api/public/v1/home/floordata')
        if(result.meta.status !== 200){
          return uni.$showMessage
        }
        result.message.forEach(floor=>{
          floor.product_list.forEach(prod=>{
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = result.message
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,
  image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  .nav-img{
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title{
  width: 100%;
  height: 60rpx;
}
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
  }

.floor-img-box{
  display: flex;
  padding-left: 10rpx;
}

</style>
