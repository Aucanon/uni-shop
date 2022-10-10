<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" cancelText placeholder="请输入搜索内容"></uni-search-bar>
    </view>
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="goToDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class="history-box" v-if="searchResults.length === 0">
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="goToGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        searchResults:[],
        historyList:[]
      };
    },
    methods:{
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.kw = e
          this.getSearchList()
        },500)
      },
      async getSearchList(){
        if(this.kw === ''){
          this.searchResults = []
          return
        }
        const {data:result} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        if(result.meta.status !== 200) return uni.$showMessage()
        this.searchResults = result.message
        
        this.saveSearchHistory()
      },
      goToDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      goToGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.history-box{
  padding: 0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    .uni-tag{
      display: block;
      background-color: #efefef;
      border: none;
      color:black;
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
