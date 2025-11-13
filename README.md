# 白塔纪事工作室网站 (Vite + React)

这是一个可部署到 GitHub Pages 的工作室网站骨架，主题为“森林风格”（放松、休闲的模拟经营与剧情向游戏），包含工作室信息、项目列表和社交链接。

快速开始

1. 在 `vite.config.js` 中把 `base` 改为你的仓库名，例如 `/my-repo/`。
2. 安装依赖：

```powershell
npm install
```

3. 本地开发：

```powershell
npm run dev
```

4. 部署到 GitHub Pages（会使用 `gh-pages` 将 `dist` 目录推送到 `gh-pages` 分支）：

```powershell
npm run deploy
```

注意

- 修改 `vite.config.js` 的 `base` 为你的仓库名（当前示例已设为 `/tarlah-game-web/`）。如果你要发布到 `https://<username>.github.io/`（username.github.io 仓库），将 `base` 设为 `/`。

后续改进建议

- 添加项目详情页和图片资源（可把图片放到 `public/`）
- 增加 SEO 元信息与 Open Graph 图像
- 添加 GitHub Actions 自动化构建与部署
