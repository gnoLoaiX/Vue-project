<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <!-- 第1个坑： -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a v-bind:class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap = "getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
// 第2个坑 引入js组件
import mui from "../../lib/mui/js/mui.min.js"
export default{
    data(){
        return {
            cates: [],
            list: []
        }
    },
    created() {
        this.getAllCategory(),
        // 默认进入页面，就主动请求 所有图片列表的数据
        this.getPhotoListByCateId(0)
    },
    mounted() {
        // 第 4 个坑 
        mui('.mui-scroll-wrapper').scroll({
            //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            deceleration: 0.0005 
        })
    },
    methods: {
        getAllCategory(){
            this.$http.get("api/getimgcategory").then(result => {
                if(result.body.status === 0){
                    // console.log(result.body.message) 
                    result.body.message.unshift({ title: "全部", id: 0 })
                    this.cates = result.body.message
                }
            })
        },
        getPhotoListByCateId(cateId) {
            // 根据 分类Id，获取图片列表
            this.$http.get("api/getimages/" + cateId).then(result => {
                if (result.body.status === 0) {
                    this.list = result.body.message
                    // console.log(parseInt(result.body.message.length))
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
// 解决警告 第 3 个坑 
    * {
        touch-action: pan-y;
    }
    .mui-slider {
        position: fixed;
        background-color: #fff;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 45px 10px 0px 10px;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>
