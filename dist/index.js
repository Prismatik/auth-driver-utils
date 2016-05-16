'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorization = require('./lib/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth(client) {
    _classCallCheck(this, Auth);

    this.client = client;
  }

  _createClass(Auth, [{
    key: 'read',
    value: function read(id) {
      return this.client.get(id).then(this.parse).catch(this.errorify);
    }
  }, {
    key: 'search',
    value: function search(query) {
      var _this = this;

      return this.client.search(query).then(function (entities) {
        return entities.map(_this.parse);
      }).catch(this.errorify);
    }
  }, {
    key: 'parse',
    value: function parse(obj) {
      if (obj.inherited_permissions) {
        obj.permissions = obj.permissions.concat(obj.inherited_permissions);
      }

      var perms = obj.permissions.reduce(function (all, perm) {
        if (all[perm.entity]) all[perm.entity].push(perm.type);else all[perm.entity] = [perm.type];
        return all;
      }, {});

      var entityType = obj.metadata && obj.metadata.type;

      return new _authorization2.default(obj.id, entityType, perms);
    }
  }, {
    key: 'errorify',
    value: function errorify(err) {
      if (err && err.message === 'entity could not be found') return null;
      throw err;
    }
  }]);

  return Auth;
}();

exports.default = Auth;