# Documentation

### First Step

> Run this on your terminal

```
npm install
```

---

### Testing

> Run this on your terminal

```
sequelize db:create --env test
sequelize db:migrate --env test

<!-- if not install sequelize-cli in global -->

npx sequelize-cli db:create --env test
npx sequelize-cli db:migrate --env test
```

```
npm run test
```

---

### All Routes

| Method | Route                 | Header     | Body             |
| ------ | --------------------- | ---------- | ---------------- |
| GET    | /items                | not needed | not needed       |
| GET    | /transactions         | not needed | not needed       |
| GET    | /transactions/:id     | not needed | not needed       |
| POST   | /transactions/:itemId | not needed | amount : integer |
| PATCH  | /transactions/:id     | not needed | status: string   |
| DELETE | /transactions/:id     | not needed | not needed       |

---
