<template>
  <view>
    <my-search @click="goToSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滑动 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i === active ? 'active' : '']" @click="activeChange(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-title">
            {{item2.cat_name}}
          </view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="goToGoodsList(item3)">
              <image class="cate-lv3-item-img" :src="item3.cat_icon" mode=""></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badegeMix from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        wh:0,//当前设备可用高度,
        cateList:[],
        cateLevel2:[],
        active:0,
        scrollTop:0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    mixins:[badegeMix],
    methods:{
      async getCateList(){
        const {data:result} = await uni.$http.get('/api/public/v1/categories')
        if(result.meta.status !== 200) return uni.$showMessage()
        this.cateList = result.message
        
        this.cateLevel2 = result.message[0].children
      },
      activeChange(i){
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      goToGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      goToSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  .left-scroll-view{
    width: 120px;
    .left-scroll-view-item{
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active{
        background-color: #ffffff;
        position: relative;
        &::before{
          content: ' ';
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .right-scroll-view{
    .cate-lv2-title{
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .cate-lv3-list{
      display: flex;
      flex-wrap: wrap;
      .cate-lv3-item{
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        image{
          width: 60px;
          height: 60px;
        }
        text{
          font-size: 12px;
        }
      }
    }
  }
}

</style>
