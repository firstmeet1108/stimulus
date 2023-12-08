# Stimulus 中文网

## 项目介绍

Stimulus 中文网是一个基于[Eleventy](https://www.11ty.dev/)的静态网站。

### 主要业务

翻译了[Stimulus](https://stimulus.hotwired.dev/)的官方文档，为国内开发者提供服务。

### 站点地址

[https://stimulus.firstmeet.store/](https://stimulus.firstmeet.store/)

## 前端部署方法：

- 1. 克隆仓库

```bash
git clone https://github.com/travelless/stimulus.git
```

- 2. 安装依赖

```bash
npm install
```

- 3. 启动项目

```bash
npm run start
```

## 后端部署方法：

- 1. 克隆仓库并进入后端目录

```bash
git clone https://github.com/travelless/stimulus.git
cd ./server/
```

- 2. 安装依赖

```bash
npm install
```

- 3. 订阅目标仓库

```bash
git remote add targetdoc https://github.com/hotwired/stimulus.git
git fetch --all
```

- 4. 配置 config.js 文件

具体配置项请参考 config.js.example 文件

- 5. 启动项目

```bash
npm run dev
```
