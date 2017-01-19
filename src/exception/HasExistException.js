import StoneException from './StoneException';

class HasExistException extends StoneException{
    constructor(name){
        var message="the stone object : ["+name+"] : has exist in it's father DOM";
        super(name,message);
    }
}

export default HasExistException;