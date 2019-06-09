#### webpack4.x开发环境配置

[参考文章：](https://blog.csdn.net/u012443286/article/details/79504289)

##### 总结：

> 1、webpack-cli 必须要全局安装，否则不能使用 webpack 指令； 
> 2、webpack 也必须要全局安装，否则也不能使用 webpack 指令。 
> 3、webpack4.x 中 `webpack.config.js` 这样的配置文件不是必须的。 
> 4、默认入口文件是 `./src/index.js`，默认输出文件 `./dist/main.js`。

配置步骤：

> 1、创建工程目录； 
> 2、初始化工程目录：npm init。 
> 3、全局安装webpack-cli。 
> 4、全局安装webpack。 
> 5、webpack –mode development/production进行打包，可在package.json中配置dev和build的脚本，便只需运行npm run dev/build，作用相同。 
> 6、在webpack –mode development/production可串联设置其他参数。



#### `npm run` : 的种种错误：

1. [webpack 自动打包更新](https://blog.csdn.net/tomwildboar/article/details/82141824)- - 重要的是项目所在路径不能有中文
2. [`npm run dev:错误`](https://blog.csdn.net/Tomwildboar/article/details/82143376)---基本上就是你的`webpack `和 你的`webpack-dev-server`的版本不兼容

```
//卸载版本
cnpm uninstall webpack -g
cnpm uninstall -g webpack-dev-server
 
//安装指定版本
cnpm install webpack@3.8.0 --save-dev
cnpm install webpack-dev-server@2.9.7 --save-dev
```

es6 语法：

```javascript
export default {
    data(){  // => data: function(){}
        return {
            lunbotuList: []
        }
    }
}

const vm = new Vue({
    el: '#app',
    // 渲染根组件
    render: c => c(app), // 简洁语法
    router
})
```



## 起步(get start)

#### 整理出一个基本的项目模板

​	mian.js 是入口文件，程序开始从这里执行，那么需要从中导入vue的包，区别于网页版的vue。App.vue 是根组件，不同的页面有着共同的样式。所以抽离为公共的组件。mian.js 中需要引入 App.vue这个文件。

##### 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html(尝试按照目录做一下)
    + **注意**：vue文件的template 中只能允许由一个根元素，所以要包裹起来 (Component template should contain exactly one root element)
    + 在制作 购物车 小图标的时候，操作会相对多一些：
    + 先把 扩展图标的 css 样式，拷贝到 项目中
    + 拷贝 扩展字体库 ttf 文件，到项目中
    + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

##### 改造 tabbar 为 router-link
 + 装包 vue-router 
 + 导包、安装路由模块 

##### 设置路由高亮
 + 具体怎么做想一想，通过浏览器元素指示器发现，当点击的时候会添加一个类，查找资料可得知

##### 点击 tabbar 中的路由链接，展示对应的路由组件

​	默认容器占满屏幕，不然点击组件会看不到切换的效果。而且设置了使用了vue的过渡动画之后，和需求由差异。不单是点击切换的效果，还有连标题都变到其他了。添加类：`overflow-x: hidden;`

#### 制作首页轮播图布局

- 使用 mint-swipe 轮播图组件
- 需要注意的是 写css样式的时候，html结构不可信，仅仅是组件的名称而已，将来渲染的时候会渲染成其他标签。原因是 使用的是mint的组件库、所以是组件的名称。

##### 加载首页轮播图数据
1. 写在定义的组件上 并且向外暴露 引用之后需要返回给根组件 api:
2. 获取数据， 如何获取呢， 使用 vue-resource（装包）
3. 使用 vue-resource 的 this.$http.get 获取数据
4. 获取到的数据，要保存到 data 身上
5. 使用 v-for 循环渲染 每个 item 项

##### 改造 九宫格 区域的样式 
 + 在mui有 grid-default
 + 改造 新闻资讯 路由链接

#### 新闻资讯 页面 制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据
4. 全局配置根路径 vue-resource 的 configuration 因为每次输入路径都太长了 [Vue-resource](https://github.com/pagekit/vue-resource/blob/HEAD/docs/config.md)、
5. 全局过滤器 格式化时间
6. 学了东西之后要知道，这东西你能解决什么问题，然后呢当遇到这个问题之后，我要用哪个来解决比较容易。这个能力很关键，使用插件 `cnpm i moment -S`

##### 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符 (使用属性绑定才能拼接字符串与表达式)
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来
4. 页面自己写
   - 高端玩家，使用 flex 布局 减少代码量，写高质量的代码
   - 两边左右对齐：`justify-content: space-between;`
5. 格式化时间插件 moment.js   =>   [momentjs.com](https://momentjs.com/)、

#### 实现 新闻详情 的 页面布局 和数据渲染

页面自己写,  - _ - 

##### 单独封装一个 comment.vue 评论子组件 

1. 分析得知有共同的地方 存放在了 comment 文件夹里
2. 先创建一个 单独的 comment.vue 组件模板
    - 父组件向子组件传值
    - 页面自己写，
3. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
    + `import comment from './comment.vue'`
4. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
5. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

##### 获取所有的评论数据显示到页面中

##### 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组





### 用到的知识：

- v-for 循环报错了，组件的 key 不支持字符串，要用数字类型

  - ```vue
    [Vue warn]: Duplicate keys detected:
    ```

- v-bind 属性绑定 、v-for 循环渲染

- { { } } 差值表达式

- 过滤器的使用、比如格式化时间

- 父组件向子组件传值