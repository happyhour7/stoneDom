##基本说明：
    配合gbuilder的stone开发方式，实现页面组件化。
    本插件绝对轻量级，单向绑定，支持jquery原生生态，利用handlebars绑定页面模板。


## 静态资源项目初始化：gbuilder.config.js、package.json,初始化的package.json中包含了尽量多的支持不同开发技术的与处理器

## 注意
    stone必须由gbuilder编译后方可使用。

## stone文件的写法
```html
    <template>
        <!--任意html模板，支持handlebars语法-->
    </template>
    <script>
        module.exports={

            data:function($scope){
                //初始化的scope中已经包含了javascript里attr函数设置的属性以及html页面（）不是模板中的属性以及对应值
                //data函数，每个页面中的stone对象，执行一次
                //返回方式两种：1，return一个json，2，将数据放到$scope中
                return{

                }
            },
            compile:function($scope){
                //初始化的scope中已经包含了javascript里attr函数设置的属性以及html页面（）不是模板中的属性以及对应值
                //compile函数，每个页面中的stone对象，执行一次
                //this：stone的dom对象
            },
            onload:function($StoneScope){
                /*
                1,同一类stone只执行一次
                2，$StoneScope：是一个json，key是stone元素的name属性，value是stone元素本身
                3，this：$StoneScope
                */
            },
            method:{
                //自定义事件
                checked:function($scope){
                    //this:页面上stone的dom元素
                    //$scope:自己的scope
                
                }
            }
        }
    </script>


```

## javascript调用的写法
```js
    var mainMenuStone=require("./stone/mainMenu.stone");
    mainMenuStone.attr("属性名","属性值");//属性名：与handlebars中的模板绑定完全一致
    //stoneDome(dom元素id)
    stoneDome("hs-nav").append(mainMenuStone);
    stoneDome("checkbox1").trigger(
        "checked",//自定义事件名称
        "a","b"  //自定义事件的参数
        );

```

## html页面中的写法
```html
    <!--此处的属性名会自动与handlebars模板中的属性名对应-->
    <hs-checkbox class="属性值" name="checkbox1"></hs-checkbox>
```

##安装
```bash
$ npm install stonedom --save
```

##依赖包
    此处依赖包其实与vue的flow依赖包完全一致，也可以直接依赖：babel-preset-flow-vue
    
    如果想要自己构建，可以自行安装如下：
    babel-plugin-transform-class-properties
    transform-flow-strip-types
    babel-plugin-syntax-flow

## 更新记录
    2017-1-13   0.0.1版本：项目初始化上线😄
    2017-1-17   0.0.4版本：参数类型出了id之外还可以是自定义tag
    2017-1-17   0.0.5版本：与gbuilder配合可以使用stone.attr进行属性的动态设置
    2017-1-19   0.0.7版本：在前版基础上，增加了stone元素的自定义事件、自定义事件触发，执行机制仿照jquery-ui
## License
    [BSD]快快来贡献😄(LICENSE)
