# node-typeorm-crud

Basic CRUD operation by using node.js and typeORM.

## Installation

- You need to create database in `mysql` with `YOUR_DATABASE_NAME`
- `git clone https://github.com/xeusteerapat/node-typeorm-crud.git`
- `cd node-typeorm-crud`
- `npm install`
- create `ormconfig.json` based on your database

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "YOUR_USER_NAME",
  "password": "YOUR_PASSWORD",
  "database": "YOUR_DATABASE_NAME",
  "entities": ["src/entity/*.ts"],
  "logging": true,
  "synchronize": true
}
```

- `npm start`

## Todo

- ~~Add `update` and `delete` routes.~~
- ~~Add authentication system.~~
- Connect to client (myabe...)
