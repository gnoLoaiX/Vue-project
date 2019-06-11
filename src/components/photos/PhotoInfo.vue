<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <!-- 最新缩略图版插件使用，看这里
             https://blog.csdn.net/qq_36742720/article/details/83270636
             -->
            <vue-preview :slides="list"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论子组件区域 父组件向子组件传值 -->
        <comment-box v-bind:id="id"></comment-box>
    </div>
</template>

<script>
import comment from "../subcomponents/comment.vue"
export default{
    data(){
        return {
            id: this.$route.params.id,
            photoinfo: {},
            list: []
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        getPhotoInfo() {
            // 获取图片的详情
            this.$http.get("api/getimageInfo/" + this.id).then(result => {
                if (result.body.status === 0) {
                    this.photoinfo = result.body.message[0]
                }
            })
        },
         getThumbs() {
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if (result.body.status === 0) {
                    // 循环每个图片数据，设置图片的宽和高
                    result.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                        item.msrc = item.src
                    })
                    // console.log(result.body.message)
                    this.list = result.body.message
                }
            })
        }
    },
    components: {
        // 注册 评论子组件
        "commentBox": comment
    }
}
</script>

<style lang="scss" scoped>
    .photoinfo-container {
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content {
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>

<style lang="scss">
    // 全局global 设置 缩略图的样式
    .photoinfo-container {
        .thumbs {
            .my-gallery{
                display: flex;
                flex-wrap: wrap;
            }
            figure {
                width: 100px;
                height: 100px;
                margin: 10px;
                box-shadow: 0 0 8px #999;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>