---
title: 结合 Lerna 与 pnpm 实现 Monorepo
createDate: 2022-05-24
---

[[TOC]]

## 介绍

随着软件项目的复杂性增加，管理多个包和依赖项可能成为一个真正的挑战。Monorepo 是一种旨在简化管理大型代码库的方法。在本文中，我们将讨论如何将 pnpm 与 Lerna 结合使用来实现 Monorepo。

## 什么是 Monorepo？

Monorepo 是一种将所有项目代码和依赖项放在同一个仓库中的软件开发方法。Monorepo 的优点在于：

- 共享代码：不同项目可以共享代码库，避免重复开发。
- 简化依赖项：在 Monorepo 中，所有项目的依赖项都被放在同一个仓库中，便于管理和更新。
- 统一构建和测试：Monorepo 可以使用一个构建和测试管道，减少重复劳动并确保所有项目都能够一致地构建和测试。
- 更容易维护：Monorepo 可以减少维护多个仓库的复杂性。

## 如何实现 Monorepo？

1. 创建一个新的目录并执行

```bash
npx lerna init
```

2. 然后会得到 `packages/` `lerna.json` `package.json`，接着在 `lerna.json` 中配置
```json
{
  "useWorkspaces": true,
  // independent：每个包有自己独立的版本号。
  // fixed：所有包共享同一个版本号。
  // lerna：所有包根据 Lerna 的版本号管理方式自动升级。
  "version": "independent",
  "npmClient": "pnpm"
}
```

3. 现在我们来配置 pnpm workspaces，在根目录创建 `pnpm-workspace.yaml`
```yaml
packages:
  - 'packages/*'
```

4. 在 packages 目录下创建你的项目包，例如 `packages/app1` 和 `packages/app2`。
5. 在每个项目包中添加一个 package.json 文件，并在其中定义依赖项和脚本。
```bash
# 也可执行以下脚本来管理每个 package 的依赖
# packages/<pkg name>
# <pkg> 指 npm 上已发布的软件包名
pnpm add --filter <pkg name> <pkg>

# 添加 packages/* 的项目作为依赖
# 若 <pkg name> 与 npm 的软件包重名，可使用 --workspace 指定安装为 workspace 级别的依赖
pnpm add --filter <pkg name> <pkg name>

pnpm remove --filter <pkg name> <pkg>

# 或项目全局依赖
pnpm -w add <pkg>
pnpm -w remove <pkg>
```

6. 之后需要重新安装或其他成员开发时只需要使用 `pnpm install` 命令来安装所有项目包的依赖项。

7. 运行项目包的脚本类似管理依赖
```bash
# 运行指定的项目中的 package script
pnpm --filter <pkg name> <script>

# 运行根目录中的 package script
pnpm <script>
```

8. 到此我们可以使用 pnpm 来实现 monorepo 的依赖管理，使用 Lerna 做自动化的版本更新和发布

```bash
# 使用 Lerna 发布版本
# 该命令会根据 lerna.json 中的版本控制配置自动更新版本号并发布包。
# 如果你需要手动指定版本号，则可以使用 lerna version 命令。
lerna publish
```



## 总结

Monorepo 是一种将所有项目代码和依赖项放在同一个仓库中的软件开发方法，它可以帮助简化管理大型代码库。Monorepo 的优点包括共享代码、简化依赖项、统一构建和测试以及更容易维护。

使用 Lerna 配合 pnpm 实现 Monorepo 可以更加方便地管理依赖项和自动化版本更新和发布。我们可以通过配置 pnpm workspaces 来定义项目包的依赖关系，并使用 Lerna 管理不同项目的版本。此外，我们还可以使用 pnpm 命令来管理每个项目包的依赖和运行项目包的脚本。

若项目依赖并不复杂，项目也都相对简单，也可只使用 pnpm 来实现 Monorepo
