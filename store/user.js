export default{
  namespaced:true,
  
  state:() =>({
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
    token:uni.getStorageSync('token') || '',
    userInfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo:null
  }),
  
  mutations:{
    updateAddress(state,address){
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userInfo))
    },
    updateUserInfo(state,userInfo){
      state.userInfo = userInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveToken(state){
      uni.setStorageSync('token',state.token)
    },
    updateToken(state,token){
      state.token = token
      this.commit('m_user/saveToken')
    },
    updateRedirectInfo(state,info){
      state.redirectInfo = info
    }
  },
  
  getters:{
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}