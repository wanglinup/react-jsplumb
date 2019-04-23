- 项目依赖 react + jsplumb
    - [jsplumb网站](https://docs.jsplumbtoolkit.com/toolkit/current/)
    - [jsplumb官网git库](https://github.com/jsplumb/jsplumb)
- 项目介绍
    - 可视化操作拓扑图，包括拖拽，连线，
## 下载依赖 
```
    npm i
```
## 启动项目
```
    npm start
```
## 项目配置-配置less(启动项目无需做下面操作)
### 暴露配置文件
```
    npm run eject
```
### 下载less-loader
```
npm install less less-loader --save-dev
```
### 修改webpack.config.js文件配置
#### 1.增加定义变量

```
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```

#### 2.仿照css配置less
```
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction && shouldUseSourceMap,
    }),
    sideEffects: true,
},
{
    test: lessModuleRegex,
    use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction && shouldUseSourceMap,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
    }),
},
```
#### 3.修改getCSSModuleLocalIdent函数内部，增加less
``` 
    // 20行原来
 const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    // 改为
 const fileNameOrFolder = context.resourcePath.match(
      /index\.module\.(css|less|scss|sass)$/
  )
```