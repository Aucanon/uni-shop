<template>
  <view class="container">
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import badegeMix from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        
      };
    },
    mixins:[badegeMix],
    computed:{
      ...mapState('m_user',['token'])
    },
  }
</script>

<style lang="scss">
page,.container{
  height: 100%;
}
</style>
