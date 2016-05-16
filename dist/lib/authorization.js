'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authorization = function () {
  function Authorization(id, role, perms) {
    _classCallCheck(this, Authorization);

    if (role != null && (typeof role === 'undefined' ? 'undefined' : _typeof(role)) === 'object') {
      perms = role;
      role = null;
    }

    if (Array.isArray(perms)) perms = _lodash2.default.fromPairs(perms);

    this.id = id;
    this.role = role;
    this.permissions = perms || {};
  }

  _createClass(Authorization, [{
    key: 'is',
    value: function is(id) {
      if (this.id == null || id == null) return false;
      return this.id === id || this.id.toString() === id.toString();
    }
  }, {
    key: 'can',
    value: function can(perm, of) {
      if (this.is(of)) return true;
      return of in this.permissions && this.permissions[of].indexOf(perm) >= 0;
    }
  }, {
    key: 'allow',
    value: function allow(perm, of) {
      var perms = _lodash2.default.clone(this.permissions);

      if ((typeof perm === 'undefined' ? 'undefined' : _typeof(perm)) === 'object' && !Array.isArray(perm)) {
        for (of in perm) {
          perms[of] = _lodash2.default.concat(perms[of] || [], perm[of]);
        }
      } else {
        perms[of] = _lodash2.default.concat(perms[of] || [], perm);
      }

      return new Authorization(this.id, this.role, perms);
    }
  }]);

  return Authorization;
}();

exports.default = Authorization;