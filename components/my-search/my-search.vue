<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius':radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props:{
      bgcolor:{
        type:String,
        default:'#C00000'
      },
      radius:{
        type:Number,
        default:18
      }
    },
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background-color: #C00000;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box{
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    // border-radius: 15px;
    // text-align: center;
    // line-height:36px ;
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>