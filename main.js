import Vue from 'vue';
import App from './App';
import uView from "uview-ui";
import { diaplayTime,changeText,checkAuditTime } from 'static/utils/utils.js'; 
import dayjs from 'dayjs'
import store from 'store/index.js'
Vue.prototype.$store = store
Vue.prototype.dayjs = dayjs;
Vue.use(uView);
Vue.config.productionTip = false;
Vue.prototype.diaplayTime = diaplayTime;
Vue.prototype.changeText = changeText;
Vue.prototype.checkAuditTime = checkAuditTime;
import share from './static/utils/share.js'

Vue.mixin(share)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
