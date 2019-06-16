<template>
    <div class="shopcar-container">
        <!-- 商品列表项区域 -->
        <div class="mui-card" v-for="(item, i) in goodList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch class="marMt"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="info">
                        <h1>{{ item.title }}</h1>
                        <p>
                            <span class="price">￥：{{ item.sell_price }}</span>
                            <numbox></numbox>
                            <a href="">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue"
export default {
    data(){
        return {
            goodList: []
        }
    },
    created(){
        this.getGoodList()
    },
    methods: {
        getGoodList(){
            const idArr = []
            this.$store.state.car.forEach(item => {
                idArr.push(item.id)
                console.log(item.id)
            })
            console.log("hehe")
            this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
                if(result.body.status === 0){
                    this.goodList = result.body.message
                    console.log(result.body.message)
                }
            })
        }
    },
    components: {
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;
        img {
            width: 60px;
        }
        h1 {
            font-size: 13px;
        }
        .mui-card-content-inner {
            display: flex;
            align-items: center;
            .mui-numbox {
                margin: 0 5px;
            }
        }
        .info {
            margin-left: 15px;
            .price {
                color: red;
                font-weight: bold;
            }
        }
    }
</style>
