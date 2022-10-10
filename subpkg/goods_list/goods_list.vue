<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="goToDetail(item)">
        <my-goods :item="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        isloading:false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(cb){
        this.isloading = true
        const {data:result} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        this.isloading = false
        cb && cb()
        if(result.meta.status !== 200) return uni.$showMessage()
        this.goodsList = [...this.goodsList,...result.message.goods]
        this.total = result.message.total
      },
      goToDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    onReachBottom() {
      if(this.queryObj.pagenum * this.queryObj.pagesize > this.total) return uni.$showMessage('数据加载完毕！')
      if(this.isloading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      this.getGoodsList(()=>{
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">

</style>
