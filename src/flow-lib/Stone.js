

import type Stone from '../lib/Stone';
/**
 * stone对象定义
 */
declare interface iStone{
    name:string;   
    onload:($scope?:{[key: string]: Stone})=>Function;
    compile:($scope?:Object)=>Function;
    data:($scope?:Object)=>Function;
    attr:($scope?:Object)=>Function;
    helper:Object;
    method:Object;
    template:string;
}

