<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <!-- 第1个坑： -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item1 mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
                        推荐
                    </a>
                    <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
                        热点
                    </a>
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
                        北京
                    </a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
                        社会
                    </a>
                    <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
                        娱乐
                    </a>
                    <a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
                        科技
                    </a>
                    <a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
                        科技
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 第2个坑 引入js组件
import mui from "../../lib/mui/js/mui.min.js"
export default{
    data(){
        return {

        }
    },
    created() {
      
    },
    mounted() {
        // 第 4 个坑 
        mui('.mui-scroll-wrapper').scroll({
            //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            deceleration: 0.0005 
        })
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
// 解决警告 第 3 个坑 
    * {
        touch-action: pan-y;
    }
</style>
