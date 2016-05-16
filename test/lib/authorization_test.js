import _ from 'lodash';
import Authorization from '../../src/lib/authorization';

describe('Authorization', function() {
  describe('new', function() {
    it('must be an instance of Authorization', function() {
      new Authorization(13).must.be.an.instanceof(Authorization);
    });

    it('must set id and permissions', function() {
      const auth = new Authorization(13, _.fromPairs([[42, ['access']]]));
      auth.id.must.equal(13);
      auth.can('access', 42).must.be.true();
    });

    it('must set id, role and permissions', function() {
      const perms = _.fromPairs([[42, ['access']]]);
      const auth = new Authorization(13, 'user', perms);
      auth.id.must.equal(13);
      auth.role.must.equal('user');
      auth.can('access', 42).must.be.true();
    });

    it('must set permissions given an array', function() {
      const auth = new Authorization(13, [[42, ['access']], [69, ['read']]]);
      auth.id.must.equal(13);
      auth.can('access', 42).must.be.true();
      auth.can('access', 69).must.be.false();
      auth.can('read', 69).must.be.true();
    });
  });

  describe('.is', function() {
    it('must return true given self', function() {
      new Authorization(42).is(42).must.be.true();
    });

    it('must return false given null', function() {
      new Authorization(42).is(null).must.be.false();
    });

    it('must return true if self given number and string', function() {
      new Authorization(42).is('42').must.be.true();
    });

    it('must return false if not self', function() {
      new Authorization(13).is(42).must.be.false();
    });
  });

  describe('.can', function() {
    it('must return true given permission', function() {
      const auth = new Authorization(13, _.fromPairs([[42, ['access']]]));
      auth.can('access', 42).must.be.true();
    });

    it('must return true given permission', function() {
      const auth = new Authorization(13, _.fromPairs([[42, ['access']]]));
      auth.can('access', 42).must.be.true();
    });

    it('must return false given empty permissions', function() {
      const auth = new Authorization(13);
      auth.can('access', 42).must.be.false();
    });

    it('must return false given null', function() {
      const auth = new Authorization(42);
      auth.can('access', null).must.be.false();
    });

    it('must return false given no permission', function() {
      const auth = new Authorization(13, _.fromPairs([[42, ['access']]]));
      auth.can('delete', 42).must.be.false();
    });

    describe('given self id', function() {
      it('must return true', function() {
        new Authorization(42).can('joke', 42).must.be.true();
      });

      it('must return true given a number and string', function() {
        new Authorization(42).can('joke', '42').must.be.true();
      });
    });
  });

  describe('.allow', function() {
    it('must allow the given permission', function() {
      const auth = new Authorization(42);
      auth.allow('access', 13).can('access', 13).must.be.true();
    });

    it('must return Authorization with the same id and role', function() {
      const auth = new Authorization(42, 'user');
      const allowed = auth.allow('access', 13);
      allowed.id.must.equal(42);
      allowed.role.must.equal('user');
    });

    it('must allow the given permission when already some set', function() {
      const auth = new Authorization(42, [[13, ['read']]]);
      const allowed = auth.allow('write', 13);
      allowed.can('read', 13).must.be.true();
      allowed.can('write', 13).must.be.true();
    });

    it('must allow the given permissions if array', function() {
      const auth = new Authorization(42);
      const allowed = auth.allow(['access', 'read'], 13);
      allowed.can('access', 13).must.be.true();
      allowed.can('read', 13).must.be.true();
    });

    it('must allow the given permissions if object', function() {
      const auth = new Authorization(42);
      const allowed = auth.allow({ 13: ['access'], 42: ['access', 'read'] });
      allowed.can('access', 13).must.be.true();
      allowed.can('access', 42).must.be.true();
      allowed.can('read', 42).must.be.true();
    });

    it('must not change the source', function() {
      const auth = new Authorization(42, [[13, ['read']]]);
      auth.allow('write', 13);
      auth.can('read', 13).must.be.true();
      auth.can('write', 13).must.be.false();
    });

    it('must not change the source given an object', function() {
      const auth = new Authorization(42, [[13, ['read']]]);
      auth.allow({ 13: ['write'] });
      auth.can('read', 13).must.be.true();
      auth.can('write', 13).must.be.false();
    });

    it('must not change the source when called again', function() {
      const auth = new Authorization(42, [[13, ['read']]]);
      auth.allow('write', 13).allow('read', 15);
      auth.can('read', 13).must.be.true();
      auth.can('write', 13).must.be.false();
      auth.can('read', 15).must.be.false();
    });
  });
});
