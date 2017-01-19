import Stone from './Stone';
import   NoStoneExistException from '../exception/NoStoneExistException';

export default{
    Stone:Stone,
    util:require('./util'),
    NoStoneExistException:NoStoneExistException,
    Handlebars:require('handlebars')
}