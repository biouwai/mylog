# 记录

## 一、初始化与技术介绍

### 初始化

1. koa2 -e Tieba
2. npm i
3. git 初始化
4. npm i cross-env ---> cross-env NODE_ENV=dev/production
5. 调整项目结构

### 创建数据库

1. 建库 Tieba
2. 建表 users
3. 外键 user
4. 联表查询

### sequelize

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

### eslint

1. npm i eslint babel-eslint --save
2. .eslingtsrc.json 文件写配置
3. npm i pre-commit --save-dev // 不符合规范不允许提交

### inspect 调试

### 404 页面

### jwt 介绍

1. 流程
   jwt 会将用户信息(类似 session 中的信息)加密后返回给客户端

   客户端后续每次请求都带此 token，以示当前的用户身份 --> 请求头 Autorization: Bearer xxx

2. 加密过程
   用户信息与一个密钥进行加密，后续也只有这个密钥能解密

3. jwt vs session

jwt 用户信息存储在客户端，不依赖与 cookie、可跨域

seesion 用户信息储存在服务端（一般 redis），依赖与 cookie、默认不可跨域

### redis

内存数据库

1. 适用场景

登陆信息、广场页(每个用户看到的差不多)

2. 使用：

1)  cache 文件夹中写方法，app 中配置
2)  此后客户端传来的 cookie 中会有 usersid, 相当于一个 key，通过这个 key 就可以找到对应的用户数据

### 单元测试

1. 安装 jest

## 二、架构设计

### 整体架构

![](/logImg/架构.png)

### 页面和路由

![](/logImg/register.png)
![](/logImg/login.png)
![](/logImg/home.png)
![](/logImg/squre.png)
![](/logImg/setting.png)
![](/logImg/person.png)

![](/logImg/页面和路由.png)

### api 设计

#### 用户

1. 登陆
   登陆 /api/user/login
2. 注册
   注册 /api/user/register
   用户名是否存在 /api/user/register
3. 设置
   修改个人信息 /api/user/changeInfo
   修改个人密码 /api/user/changePassword
   图片上传 /api/user/upload
   退出登陆 /api/user/logout

#### 微博

1. 首页
   ![](/logImg/微博api.png)

### 数据模型设计

![](/logImg/数据模型.png)

## 三、用户接口

### 判断用户名是否存在接口

1. 创建 user 路由页，在此判断是哪个接口
2. 在 controller 层写方法，给 user 的路由用
3. 在 services 层去调数据库的数据，格式化后给 controller 层用
4. 格式化方法、返回的数据模型、常量、错误信息等要抽离出来，方便更好的维护
