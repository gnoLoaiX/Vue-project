<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title"> {{ newsinfo.title }} </h3>
        <!-- 子标题 -->
        <p class="subTitle">
            <span> 发表时间：{{ newsinfo.add_time | dateFormat('YYYY-MM-DD  hh:mm:ss') }} </span>
            <span> 点击：{{ newsinfo.click }} </span>
        </p>
        <!-- 内容区域 -->
        <hr>
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 父组件向子组件传值 -->
        <comment-box v-bind:id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from "../subcomponents/comment.vue"
import { Toast } from "mint-ui"
export default {
    data(){
        return {
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/' + this.id).then(result => {
                if(result.body.status === 0) {
                    // console.log(result)
                    this.newsinfo = result.body.message[0]
                } else {
                    Toast("获取新闻失败！")
                }
            })
        }
    },
    components: {
        // 用来注册子组件的节点
        'commentBox': comment
    }
}
</script>

<style lang="scss" scoped>
    .newsinfo-container{
        padding: 0 4px;
        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: #ff5722;
        }
        .subTitle {
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content {
            img {
                width: 100%;
            }
        }
    }
</style>
