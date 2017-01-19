import StoneException from './StoneException';

class GiveUpException extends StoneException{
    constructor(name){
        var message="the stone object : ["+name+"] : data function giveup";
        super(name,message);
    }
}
export default GiveUpException;