import _ from 'lodash';

export default class Authorization {
  constructor(id, role, perms) {
    if (role != null && typeof role === 'object') {
      perms = role;
      role = null;
    }

    if (Array.isArray(perms)) perms = _.fromPairs(perms);

    this.id = id;
    this.role = role;
    this.permissions = perms || {};
  }

  is(id) {
    if (this.id == null || id == null) return false;
    return this.id === id || this.id.toString() === id.toString();
  }

  can(perm, of) {
    if (this.is(of)) return true;
    return of in this.permissions && this.permissions[of].indexOf(perm) >= 0;
  }

  allow(perm, of) {
    const perms = _.clone(this.permissions);

    if (typeof perm === 'object' && !Array.isArray(perm)) {
      for (of in perm) {
        perms[of] = _.concat(perms[of] || [], perm[of]);
      }
    } else {
      perms[of] = _.concat(perms[of] || [], perm);
    }

    return new Authorization(this.id, this.role, perms);
  }
}
