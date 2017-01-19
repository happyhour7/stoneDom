"use strict";

var _imports = require("./lib/imports");

var _imports2 = _interopRequireDefault(_imports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Stone = _imports2.default.Stone,
    Handlebars = _imports2.default.Handlebars,
    NoStoneExistException = _imports2.default.NoStoneExistException,
    util = _imports2.default.util;

//以页面为单位，每个页面拥有若干个stone

var $StoneScope = {}; //公共作用域群组

module.exports = function (id) {
    var dom = !id.indexOf("#") && [document.getElementById(id)] || !id.indexOf(".") && document.getElementsByClassName(id) || document.getElementsByTagName(id);
    return {
        /**把元素添加到界面 */
        append: function append(stone) {
            var helpers = stone.helper || {},
                //helper
            onload = stone.onload || function () {},
                //onload
            sourceHtml = stone.template; //模板代码

            /**
             * 1，注册所有helper
             * 2，确定选中元素是否唯一
             * 3，当选中元素不唯一时遍历
             * 4，选择唯一元素后：1）设置元素scope；2）运行元素dataFn；3）返回单一scope；4）利用单一scope运行onload
             */
            for (var key in helpers) {
                //注册所有heler
                Handlebars.registerHelper(key, helpers[key]);
            }
            var template = Handlebars.compile(sourceHtml);
            util.each(dom, function (index, domItem, arr) {
                var stoneObj;
                //创建stone对象
                try {
                    stoneObj = new Stone(domItem, stone);
                } catch (e) {
                    console.warn(e.message);
                    return;
                }
                stoneObj.create(template);
                var newIndex = 0;
                while (!!$StoneScope[stoneObj.$scope.name]) {
                    stoneObj.$scope.name += newIndex++;
                }
                $StoneScope[stoneObj.$scope.name] = stoneObj;
            });

            onload.call($StoneScope, $StoneScope);

            return this;
        },
        /**触发stone中method里定义的事件 */
        trigger: function trigger() {
            /**
             * 如果给定name的stone不存在
             */
            if (!$StoneScope[id]) {
                throw new NoStoneExistException(id);
            }

            //把arguments转化成数组
            var args = Array.prototype.slice.call(arguments),
                callback = $StoneScope[id].method[args.shift()]; //第一个是回调函数本身的名字

            //新参数列表的第一个参数其实就是$scope
            args.unshift($StoneScope[id]);
            //执行stone上的东西
            if ('undefined' !== typeof callback.apply($StoneScope[id].dom, args)) {
                return callback.apply($StoneScope[id].dom, args);
            } else {
                return this;
            }
        }
    };
};