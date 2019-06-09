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



#### 绘制图片分享组件页面结构
 1. 制作 顶部的滑动条  ()
 2. 制作 底部的图片列表
##### 制作顶部滑动条的坑们：(有五个坑)
 1. 需要借助于 MUI 中的 tab-top-webview-main.html  

    - (在github上)  mui-master\examples\hello-mui\examples

 2. 发现直接使用之后，需要把 slider 区域的 mui-fullscreen 类去掉，才是想要的样式，

 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
    + 导入 mui.js 

    + 调用官方提供的 方式 去初始化：

    + ```javascript
      // 执行时机是 mounted这个钩子函数中
      mui('.mui-scroll-wrapper').scroll({
      	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      })
      ```
 4. 我们在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`、
    + 经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
    + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
    + 最终，我们选择了 plan B  移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode(文档)

    `[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See`https://www.chromestatus.com/features/5093566007214080..

    - 方法一：函数声明

      - ```javascript
        elem.addEventListener(
          'touchstart',
          fn,
          { passive: false }
        );
        ```

    - 方法二：css解决  此处选择方法二解决

      - ```
        * { touch-action: pan-y; }  
        ```

 5. 出现的问题：重新进入图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕（初始化的时机很重要），所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期钩子函数中；（最早能在mounted中操作，这个时候的DOM是最新的）

 6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；样式又出错了？在重新写一下就完事了 样式从浏览器中的调试窗口得来。（这些坑：要为生活中的小惊喜而--握住一根草wocao）

 7. 获取所有分类，并渲染 分类列表；(scrope 内部封装的方法，当点击的时候会加上高亮的类，和路由无关)

##### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据

##### 实现了 图片列表的 懒加载改造和 样式美化

实现了 点击图片 跳转到 图片详情页面

1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素

##### 实现 详情页面的布局和美化，同时获取数据渲染页面

##### 实现 图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
3. 注意： img标签上的class不能去掉
4. 注意： 每个 图片数据对象中，必须有 w 和 h 属性

##### 绘制 商品列表 页面基本结构并美化

##### 尝试在手机上 去进行项目的预览和测试
1. 要保证自己的手机可以正常运行；
2. 要保证 手机 和 开发项目的电脑 处于同一个 WIFI 环境中，也就是说 手机 可以 访问到 电脑的 IP
3. 打开自己的 项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令， 把 当前 电脑的 WIFI IP地址， 设置为 --host 的指令值；
 + 如何查看自己电脑所处 WIFI 的IP呢， 在 cmd 终端中运行 `ipconfig` ， 查看 无线网的 ip 地址
 4. 在调试中发现，点击顶部的滑动条的时候，真机上即使点击了不能组件切换，这是因为mui封装的组件内部除了使用click之外，还可以用tap点击的。之前使用的是click加载事件的列表。



### 用到的知识：

- v-for 循环报错了，组件的 key 不支持字符串，要用数字类型

  - ```vue
    [Vue warn]: Duplicate keys detected:
    ```

- v-bind 属性绑定 、v-for 循环渲染

- { { } } 差值表达式

- 过滤器的使用、比如格式化时间

- 父组件向子组件传值