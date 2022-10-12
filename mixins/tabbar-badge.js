import {mapGetters} from 'vuex'

export default{
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  onShow() {
    this.setBadge()
  },
  watch:{
    total:{
      handler(newVal){
        this.setBadge()
      },
      immediate:true
    }
  },
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:this.total + ''
      })
    }
  }
}