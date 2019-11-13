import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postKeyValueRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/utils";
import 'font-awesome/css/font-awesome.css';

Vue.use(ElementUI,{size:'small'});
Vue.config.productionTip = false

Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;

router.beforeEach((to, from, next) =>{
  initMenu(router,store);
  next();
})
new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
