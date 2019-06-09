<template>
    <div class="com-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入想要评论的内容……" autofocus></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <!-- key 文档没有id 那可以用时间作为唯一值 -->
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    <!-- 不能i++ 因为会给它赋值 -->
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat('YYYY-MM-DD  hh:mm:ss') }}
                </div>
                <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    export default {
        data() {
            return {
                pageIndex: 1,
                comments: []
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments(){
                // 获取评论
                this.$http
                .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                .then(result => {
                    if (result.body.status === 0) {
                        // console.log(result.body)
                        // this.comments = result.body.message;
                        // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据 因为是没有存储到服务器
                        this.comments = this.comments.concat(result.body.message);
                    } else {
                        Toast("获取评论失败！");
                    }
                })
            },
            getMore(){
                this.pageIndex++ 
                this.getComments()
            }
        },
        props: ["id"]
    }
</script>

<style lang="scss" scoped>
    .com-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>
