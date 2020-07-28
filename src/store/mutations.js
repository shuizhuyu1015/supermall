import {
  ADD_COUNT,
  ADD_TO_CART,
  CHANGE_CHECKED
} from './mutation-types';

export default {
  // 已有商品，数量+1
  [ADD_COUNT](state, payload) {
    payload.count ++;
  },
  // 新增商品到购物车
  [ADD_TO_CART](state, payload) {
    payload.count = 1;
    payload.checked = true;
    state.cartList.push(payload);
  },
  // 修改商品选中状态
  [CHANGE_CHECKED](state, payload) {
    payload.checked = !payload.checked;
  }
}
