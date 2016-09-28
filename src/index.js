import Authorization from './lib/authorization';

export default class Auth {
  constructor(client) {
    this.client = client;
  }

  read(id) {
    return this.client.get(id).then(this.parse).catch(this.errorify);
  }

  create(data) {
    return this.client.create(data).then(this.parse).catch(this.errorify);
  }

  search(query) {
    return this.client.search(query)
      .then(entities => entities.map(this.parse))
      .catch(this.errorify);
  }

  parse(obj) {
    if (obj.inherited_permissions) {
      obj.permissions = obj.permissions.concat(obj.inherited_permissions);
    }

    const perms = obj.permissions.reduce((all, perm) => {
      if (all[perm.entity]) all[perm.entity].push(perm.type);
      else all[perm.entity] = [perm.type];
      return all;
    }, {});

    const entityType = obj.metadata && obj.metadata.type;

    return new Authorization(obj.id, entityType, perms);
  }

  errorify(err) {
    if (err && err.message === 'entity could not be found') return null;
    throw err;
  }
}
