import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-type";

export default {
  addCart(context, payload) {
    return new Promise(resolve => {
      //1、查找该商品
      let oldProduct = context.state.cartList.find(item => item.iid == payload.iid);

      //2、没有该商品则添加，否则数量加1
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('商品数量添加+1');
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve('商品添加成功');
      }
    });
  }
}
