<template>
    <div class="goodsinfo-container">
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p class="direction">
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                    </p>
                </div>
            </div>
         
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                <p>商品货号：{{ goodsinfo.goods_no }}</p>
                <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

        <!-- 小球 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
    </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue"
import numbox from "../subcomponents/goodsinfo_numbox.vue"
export default {
    data(){
        return {
            id: this.$route.params.id,
            lunbotu: [],
            goodsinfo: {}, 
            ballFlag: false,
            selectedCount: 1
        }
    },
    created() {
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods: {
        getLunbotu(){
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0) {
                    // console.log(result.body.message)
                    result.body.message.forEach(item => {
                        item.img = item.src  
                    })
                    this.lunbotu = result.body.message
                }
            })
        },
        getGoodsInfo() {
            this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                if (result.body.status === 0) {
                    // console.log(result.body.message[0])
                    this.goodsinfo = result.body.message[0]
                }
            })
        },
        goDesc(id){
            // 点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({ name: 'goodsdesc', params: { id } })
        },
        goComment(id) {
            // 点击跳转到 评论页面
            this.$router.push({ name: "goodscomment", params: { id } });
        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag
            // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
            const goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
            }
            // 调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit("addToCar", goodsinfo)
        },
        beforeEnter(el){
            // console.log(el)
            el.style.transform = "translate(0, 0)"
        },
        enter(el, done){
            // 获取小秋页面的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            const badgePosition = document.getElementById("badge").getBoundingClientRect()
            const xPos = badgePosition.left - ballPosition.left
            const yPos = badgePosition.top - ballPosition.top
            el.style.transform = `translate(${xPos}px, ${yPos}px)`
            // 贝塞尔曲线
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count){
            this.selectedCount = count
             console.log("数字输入框组件向父组件实时同步的数量值为： " + this.selectedCount)
        }
    },
    components: {
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer {
            display: block;
            button {
                margin: 15px 0;
            }
        }
        .direction {
            display: flex;
            justify-content: space-between;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
</style>
