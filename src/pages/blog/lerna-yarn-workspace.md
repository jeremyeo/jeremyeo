---
title: 基于 lerna & yarn(workspace) 实现 monorepo
---

[[TOC]]

公司的项目随着不断的开发变得越发臃肿，于是将 `UI` 与算法逻辑抽离成独立的库，再由主项目与其他项目依赖，便于开发与维护，同时提升主项目的打包速度。

考虑到若分成多个独立项目，更新与发布的步骤会比较麻烦，特别是正在开发中，代码更新较为频繁，所以使用 `lerna` 管理各项目的更新与发布，利用 yarn workspace 模式可以让依赖管理更加的便捷，同时优化了储存空间避免安装重复的依赖。


## 项目搭建

1. 全局安装 `lerna` & `yarn`

2. 使用 `lerna init` 初始化 `lerna` 项目结构

3. 在 `lerna.json` 中配置 `npmClient` 为 `yarn` 并启用 `workspace`

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": [
    "packages/*"
  ],
  "command": {
    "publish": {
      "npmClient": "npm"
    },
    "bootstrap": {
      "hoist": true,
      "npmClientArgs": [
        "--no-package-lock",
        "--no-ci",
        "--registry https://registry.npm.taobao.org/"
      ]
    }
  },
  "changelog": {
    "labels": {
      "feat": "New Feature",
      "fix": "Bug Fix",
      "docs": "Documentation",
      "types": "Types",
      "perf": "Performance",
      "refactor": "Refactor"
    }
  }
}
```


4. 在 `package.json` 中配置 workspace

```json
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*"]
}
```

   

## 使用 `yarn` 管理依赖

使用 `lerna` 也可以管理依赖，但略显繁琐，使用 `yarn` 的 `workspace` 模式会很方便。

- 安装所有依赖
```shell
# 会根据 workspace 的配置进行安装与依赖
yarn (install)
```

- 管理全局依赖
```shell
yarn -W add / remove [-D]  [package name]
```

- 管理项目依赖
```shell
# 若是项目建的依赖关联需指定对应的版本号，否则会去线上源寻找依赖
yarn workspace [package name] add / remove [package name]@[version]
```


## 使用 `lerna` 管理发布

在 `package.json` 中标记了 `private: true` 的包不会被 `lerna` 发布。

通过 `lerna publish` 命令根据需求配置好后更新相应的包版本，并发布到相应的托管平台。
