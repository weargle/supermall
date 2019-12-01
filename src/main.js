import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import FastClick from 'fastclick';
import VueLazyload from "vue-lazyload";

import Toast from "components/common/toast";

Vue.config.productionTip = false;

//添加事件总线对象
Vue.prototype.$bus = new Vue();
//安装Toast插件
Vue.use(Toast);

//解决300毫秒的延迟
FastClick.attach(document.body);

//图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
