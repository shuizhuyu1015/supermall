import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// 安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 创建store对象，挂载到Vue实例
export default new Vuex.Store({
  state,
  getters,
  mutations,  // mutations唯一目的就是修改state中状态，里面每个方法尽可能完成的事件比较单一点
  actions,
  modules: {
  }
})
