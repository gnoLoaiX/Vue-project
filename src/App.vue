<template>
    <div class="app-container">
        <!-- mint-Header 顶部导航栏，支持显示按钮、自定义文字和固定在顶部。 -->
        <mt-header fixed title="基于Vue的移动端项目"></mt-header>

        <!-- 中间的 路由 router-view 区域 -->
		<transition>
			<router-view></router-view>
		</transition>

        <!-- mui-Tabbar 底部选项卡，点击 tab 会切换显示的页面。依赖 tab-item 组件 -->
        <!-- 底部 Tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-yjl" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-yjl" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-yjl" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-yjl" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .app-container {
        padding-top: 40px;
        padding-bottom: 51px;
        overflow-x: hidden;
    }
    .mint-header {
        z-index: 99;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }

    // 该类名，解决 tabbar 点击无法切换的问题 样式从浏览器中的调试窗口得来
    .mui-bar-tab .mui-tab-item-yjl.mui-active {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-yjl {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-yjl .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-yjl .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>


