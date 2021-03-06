# Auth Driver Utils [![Build Status](https://travis-ci.org/Prismatik/auth-driver-utils.svg?branch=master)](https://travis-ci.org/Prismatik/auth-driver-utils)

Useful methods to extend Auth driver.

## Getting started

```
npm i auth-driver-utils
```

## Usage

### Auth(client: AuthDriver)

Expects a valid instance of Auth driver to extend upon.

### .read(id: UUID)

Maps Auth driver's `.get` method to `.read` (for better CRUD naming) and applies
`.parse` to the result.

### .search(query: Object)

Extends Auth driver's `.search` method by applying `.parse` to each result.

### .parse(obj: Object)

Converts an Entity from the Auth Service into an Authorization instance with helper methods (see below).

### .create(obj: Object)

Creates a new entity within the Auth Service, then parses the new entity record into an Authorization instance.
Note: You must provide the object in the Auth Service format (refer [entity schema](https://github.com/Prismatik/auth/blob/master/schemas/entity.md)), not a Authorization object.

### .Authorization

Provides direct access to the Authorization class, useful for testing permissions.

```
const Authorization = require('auth-driver-utils').Authorization;

new Authorization(<id>, <role>, <permissions>)
```

Permissions must be in the Authorization format e.g.
```
permissions: {
  <entity>: [<type>, <type>]
  ...
}
```

---

### Authorization instance methods

#### .is(id: UUID)

Checks if the passed id matches the id of the auth user instance.

#### .can(perm: String, of: UUID)

Checks if user (`of`) has permission (`perm`) to do something.

#### .allow(perm: String, of: UUID)

Adds permission (`perm`) to user (`of`).  Useful for when dealing with legacy
permissions and metadata.
