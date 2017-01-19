
import util from './util';

//已存在stone二次渲染的异常触发
import HasExistException from '../exception/HasExistException';

//用户主动放弃渲染，触发警告
import GiveUpException from '../exception/HasExistException';


/**
 * dom:界面对应的stone容器
 * diyAttrs:用户在js里通过attr属性设置的属性
 * 此处代表页面上的某一个stone，而不是某一类stone，比如checkbox的stone，每一个class代表一个
 */

class StoneObject{
    constructor(domItem:Object, stone: iStone){
        var nullFn=function(){};
        //stone的类型名称
        this.stoneName=stone.name||"unknowStone";
        this.$scope={};
        this.dom=domItem;
        this.attrs=stone.attr();
        this.compileFn=stone.compile||nullFn;
        this._dataFn=stone.data||nullFn;

        //用户自定义的方法
        this.method=stone.method;

        //开始执行初始化
        this.initScope();

        //这里的name，与.stone文件里的name不一样，那个是stone的类型名称，这里是指带具体的哪一个stone
        this.name=this.$scope.name;
        this.dom.name=this.name;
        //获取用户数据函数
        this.dataFn();
    }
    compile(){
        this.compileFn.call(this.dom,this.$scope);
    }   
    initScope(){
        var tmpAttribus = this.dom.attributes;
        var self=this;
            //读取dom中设置的属性
        util.each(tmpAttribus,function(index,attribute,attributes){
            if(attribute.name){
                //默认取属性值，如果没有值就返回属性名
                self.$scope[attribute.name]=attribute.value||attribute.name;
            }
        });
        //读取js里的attr属性，，如果js中存在静态设定就覆盖dom里的设定
        for(var key in this.attrs){
            this.$scope[key]=this.attrs[key];
        }
        //获取、设置当前stone对象的名字
        this.$scope.name=this.$scope.name||this.stoneName;
    }

    create(template){
        //如果夫元素不是空的就退出
        if(this.dom.innerHTML!=""){
            throw new HasExistException(this.name);
        }
        this.dom.innerHTML=template(this.$scope);
        //编译
        this.compile();
    }
    dataFn(){
        /**
         * data函数强制返回false，则停止所有编译动作，不干了
         */
        if(false===this._dataFn.call(this.$scope,this.$scope)){
            throw new GiveUpException(this.name);
        }
        this.$scope=(this._dataFn.call(this.$scope,this.$scope)) || this.$scope;
    }
}
export default Stone;

