
function each (arr:Array<any>,fn:(index: number,item: any,arrSelf: Array<any>)=>Function):void{
    for(var i=0,ii=arr.length;i<ii;i++){
        if(fn.call(arr[i],i,arr[i],arr)===false){
            break;
        }
    }
}
module.exports.each=each;