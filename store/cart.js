export default{
  namespaced:true,
  
  state:() => ({
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  
  mutations:{
    addToCart(state,goods){
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      if(!findResult){
        state.cart.push(goods)
      }else{
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    updataGoodsState(state,goods){
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updataGoodsCount(state,goods){
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    removeGoodsById(state,goods_id){
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    updataAllGoodsState(state,newState){
      state.cart.forEach(item => item.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },
  
  getters:{
    total(state){
      // let c = 0
      // state.cart.forEach(goods => c += goods.goods_count)
      // return c
      return state.cart.reduce((total,item) => total += item.goods_count,0)
    },
    checkCount(state){
      return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count ,0)
    },
    checkGoodsAmount(state){
      return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price,0).toFixed(2)
    }
  }
  
}