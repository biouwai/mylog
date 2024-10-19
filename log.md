# 记录

## 初始化

1. koa2 -e Tieba
2. npm i
3. git 初始化
4. npm i cross-env ---> cross-env NODE_ENV=dev/production
5. 调整项目结构

## 创建数据库

1. 建库 Tieba
2. 建表 users
3. 外键 user
4. 联表查询

## sequelize

帮助简化操作数据库操作

1. 简化操作

- 数据表 --> 用 JS 中的模型(class 或对象)代替
- 一条或多条记录 --> 用 JS 中一个对象或数组代替
- sql 语句 --> 用对象方法代替

2. 创建 users 表

```js
const User = seq.define("user", {
  // id自动创建并设置为主键、自增
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: Sequelize.STRING,
    comment: "昵称",
  },
  // 自动创建createAt和updateAt
});
```

3. 外键关联

```js
// 多对一
Blog.belongsTo(User, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: "userId",
});

or;
// 一对多
User.hasMany(Blog, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: "userId",
});
```

4. 项目
   npm i sequelize mysql2 -save

## eslint

1. npm i eslint babel-eslint --save
2. .eslingtsrc.json 文件写配置
3. npm i pre-commit --save-dev // 不符合规范不允许提交

## inspect 调试
