/**
 * 这是入口文件
 */

// 1.导入vue
import Vue from 'vue'
// 1.1 导入路由的包-安装路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 2.1 导入、安装 vue-resource 用于数据请求
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 2.2 导入 MUI 的样式、导入扩展图标样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 2.3 导入格式化时间插件
import moment from 'moment'
Vue.filter('dateFormat', function (value, pattern = "YYYY-MM-DD") {
    return moment(value).format(pattern)
})

// 1.4 导入 App 根组件之前，需要 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)


// 2.4 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// Vue.use(preview, {
//     mainClass: 'pswp--minimal--dark',
//     barsSize: {top: 0, bottom: 0},
//     captionEl: false,
//     fullscreenEl: false,
//     shareEl: false,
//     bgOpacity: 0.85,
//     tapToClose: true,
//     tapToToggleControls: false
// })

// 2.导入 App 根组件
import app from './App.vue'
// 1.2 导入自己的 router.js 路由模块
import router from './router.js'

// 这是入口文件
const vm = new Vue({
    el: '#app',
    // 渲染根组件
    render: c => c(app),
    router
})