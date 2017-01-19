"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoneException = function StoneException(name, message) {
    _classCallCheck(this, StoneException);

    this.name = name;
    this.message = message;
};

exports.default = StoneException;