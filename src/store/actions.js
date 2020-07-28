import {
  ADD_COUNT,
  ADD_TO_CART,
  CHANGE_CHECKED
} from './mutation-types';

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找新增加商品是否已存在
      let oldGoods = context.state.cartList.find(item => item.iid == payload.iid);

      if (oldGoods) {
        // 如果存在，老商品数量+1
        context.commit(ADD_COUNT, oldGoods);
        resolve('当前商品数量+1');
      } else {
        // 如果不存在，新增到购物车
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品');
      }
    })
  },
  changeChecked(context, payload) {
    let oldGoods = context.state.cartList.find(item => item.iid == payload.iid);
    context.commit(CHANGE_CHECKED, oldGoods);
  }
}
