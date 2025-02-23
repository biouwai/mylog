## 配置 Vite

Vite 的配置文件默认为 vite.config.js，位于项目的根目录下。这个文件允许你自定义 Vite 的行为。以下是一些常见的配置项：

```js
// 1. base: 设置应用的基础路径。这对于部署到子路径的情况非常有用。
export default defineConfig({
  base: "/my-sub-path/",
});
// 2.server: 配置开发服务器的行为。例如，更改监听的端口或者启用 HTTPS。
export default defineConfig({
  server: {
    port: 8080,
    https: true,
  },
});
// 3. build: 配置构建输出的设置。例如，指定输出目录或者压缩代码。
export default defineConfig({
  build: {
    outDir: "dist",
    minify: true,
  },
});
// 4. plugins: 添加插件来扩展 Vite 的功能。Vite 支持多种插件，可以用来处理 CSS、图片资源等。
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});

// 5. 修改 Vite 配置
/**
 * 根据项目需求，你可能需要对 Vite 的配置进行调整。例如，如果希望项目在不同的环境中表现不同，可以通过环境变量来实现这一点。
 * Vite 允许你在配置文件中使用条件语句来动态改变配置。
*/
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  // process.cwd() 是 Node.js 中的一个全局函数，它返回当前工作目录的路径
  /** '' 参数：
    这是 loadEnv 函数的第三个参数，它是一个字符串前缀。在加载环境变量时，
    只有以这个前缀开头的变量才会被加载。这里空字符串表示加载所有的环境变量。
  */

  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    base: env.VITE_APP_BASE_PATH || "/",
    server: {
      host: env.VITE_APP_HOST || "localhost",
    },
  });
};
// 在这个例子中，我们使用了 loadEnv 方法来加载环境变量，并根据这些变量动态地改变基础路径和主机名。
```

// 5. 常用配置
// 主机名、端口、自动打开浏览器、设置代理

```json
{
  "server": {
    "host": "0.0.0.0",
    "post": 4000,
    "open": true,
    "proxy": {
      "/api": "http://localhost:4567"
    }
  }

// target 负责指定请求转发的目标地址，而 rewrite 负责对请求路径进行调整，两者的作用不同
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4567',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
}
```

// 这样，所有的以 /api 开头的请求都会被代理到 http://localhost:4567。例如，/api/users 会被代理到 http://localhost:4567/users。

## 原理

### 核心原理

1. 当声明一个 script 标签类型为 module 时,如
   `<script type="module" src="/src/main.js"></script>`
2. 当浏览器解析资源时，会往当前域名发起一个 GET 请求 main.js 文件
   ```js
   import { createApp } from "vue";
   import App from "./App.vue";
   createApp(App).mount("#app");
   ```
3. 请求到了 main.js 文件，会检测到内部含有 import 引入的包，又会 import 引用发起 HTTP 请求获取模块的内容文件，如 App.vue、vue 文件

- Vite 其核心原理是利用浏览器现在已经支持 ES6 的 import,碰见 import 就会发送一个 HTTP 请求去加载文件，Vite 启动一个 koa 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以 ESM 格式返回返回给浏览器。Vite 整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的 webpack 开发编译速度快出许多！

### 基于 ESM 的 HMR 热更新

- 目前所有的打包工具实现热更新的思路都大同小异：主要是通过 WebSocket 创建浏览器和服务器的通信监听文件的改变，当文件被修改时，服务端发送消息通知客户端修改相应的代码，客户端对应不同的文件进行不同的操作的更新。
- VS Webpack
  - Webpack: 重新编译，请求变更后模块的代码，客户端重新加载
  - Vite: 请求变更的模块，再重新加载
  - Vite 通过 chokidar 来监听文件系统的变更，只用对发生变更的模块重新加载， 只需要精确的使相关模块与其临近的 HMR 边界连接失效即可，这样 HMR 更新速度就不会因为应用体积的增加而变慢而 Webpack 还要经历一次打包构建。所以 HMR 场景下，Vite 表现也要好于 Webpack。

## 核心流程

1.  Vite 整个热更新过程可以分成四步：

    - 创建一个 websocket 服务端和 client 文件，启动服务
    - 通过 chokidar 监听文件变更
    - 当代码变更后，服务端进行判断并推送到客户端
    - 客户端根据推送的信息执行不同操作的更新

整体流程图：
