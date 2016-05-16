import Auth from '../src/index';
import Authorization from '../src/lib/authorization';

describe('Auth', function() {
  describe('.parse', function() {
    it('must return an instance of Authorization', function() {
      const UUID1 = 'ee542e9c-72c5-11e5-8bcf-feff819cdc9f';
      const UUID2 = '364af3e4-04be-449b-9125-2fe214a474ef';
      const UUID3 = '42b1e801-c6f3-4261-8f41-a2ef9ff7ce87';
      const UUID4 = 'c0a6360e-d98a-4e68-9afc-069f8ab81e16';

      const auth = new Auth().parse({
        id: UUID1,
        metadata: { type: 'user' },
        permissions: [
          { type: 'access', entity: UUID2 },
          { type: 'see-prices', entity: UUID2 },
          { type: 'set-permissions', entity: UUID2 },
          { type: 'access', entity: UUID3 },
          { type: 'purchase', entity: UUID4 }
        ]
      });

      auth.must.be.an.instanceof(Authorization);
      auth.id.must.equal(UUID1);
      auth.role.must.equal('user');
      auth.can('access', UUID2).must.be.true();
      auth.can('see-prices', UUID2).must.be.true();
      auth.can('set-permissions', UUID2).must.be.true();
      auth.can('purchase', UUID2).must.be.false();
      auth.can('access', UUID3).must.be.true();
      auth.can('purchase', UUID4).must.be.true();
    });
  });
});
