

import StoneException from './StoneException';


class NoStoneExistException extends StoneException{
    constructor(name){
        var message="the stone named :["+name+"] is not found";
        super(name,message);
    }
}
export default NoStoneExistException;