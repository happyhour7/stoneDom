"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * dom:界面对应的stone容器
 * diyAttrs:用户在js里通过attr属性设置的属性
 */

var Stone = function () {
    function Stone(domItem, stone) {
        _classCallCheck(this, Stone);

        this.name = stone.name || "unknowStone";
        this.$scope = {};
        this.dom = domItem;
        this.dom.name = this.name;
        this.attrs = stone.attr();
        this.compileFn = stone.compile || nullFn;
        this._dataFn = stone.data || nullFn;
        //开始执行初始化
        this.initScope();
        //获取用户数据函数
        this.dataFn();
    }

    _createClass(Stone, [{
        key: "compile",
        value: function compile() {
            this.compileFn.call(this.dom, this.$scope);
        }
    }, {
        key: "initScope",
        value: function initScope() {
            var tmpAttribus = this.dom.attributes;
            var self = this;
            //读取dom中设置的属性
            _util2.default.each(tmpAttribus, function (index, attribute, attributes) {
                if (attribute.name) {
                    //默认取属性值，如果没有值就返回属性名
                    self.$scope[attribute.name] = attribute.value || attribute.name;
                }
            });
            //读取js里的attr属性，，如果js中存在静态设定就覆盖dom里的设定
            for (var key in this.attrs) {
                this.$scope[key] = this.attrs[key];
            }
        }
    }, {
        key: "create",
        value: function create(template) {
            this.dom.innerHTML = template(this.$scope);
            //编译
            this.compile();
        }
    }, {
        key: "dataFn",
        value: function dataFn() {
            /**
             * data函数强制返回false，则停止所有编译动作，不干了
             */
            if (false === this._dataFn.call(this.$scope, this.$scope)) {
                throw new giveUpException(this.name);
            }
            this.$scope = this._dataFn.call(this.$scope, this.$scope) || this.$scope;
        }
    }]);

    return Stone;
}();

exports.default = Stone;


function giveUpException(name) {
    name = name || "unknowStone";
    this.message = "the stone object : [" + name + "] : data function giveup";
    this.code = 0;
}