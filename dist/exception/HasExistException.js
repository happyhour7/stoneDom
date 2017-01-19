"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StoneException2 = require("./StoneException");

var _StoneException3 = _interopRequireDefault(_StoneException2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HasExistException = function (_StoneException) {
    _inherits(HasExistException, _StoneException);

    function HasExistException(name) {
        _classCallCheck(this, HasExistException);

        var message = "the stone object : [" + name + "] : has exist in it's father DOM";
        return _possibleConstructorReturn(this, (HasExistException.__proto__ || Object.getPrototypeOf(HasExistException)).call(this, name, message));
    }

    return HasExistException;
}(_StoneException3.default);

exports.default = HasExistException;