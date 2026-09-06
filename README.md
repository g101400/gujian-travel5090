# 古建景点打卡 (GuJian Travel)

古建景点打卡与旅游路线管理 APP 的前端工程。基于 Leaflet + WebView 的跨平台方案：
Android / Windows(WebView2) / UOS(Linux) / iOS(PWA) 四端共享同一套 Web 源码。

## 工程结构

- `assets/` —— Web 前端源码（随 APK / Win / UOS / iOS 打包的核心）
  - `index.html` 入口
  - `app.js` 主逻辑（版本唯一真相源由 `version.json` 同步）
  - `data.js` 初始种子数据（1032 处古建/文物景点，覆盖 34 省级行政区）
  - `kb_rag.js` 知识库切片与 RAG 检索
  - `ai_module.js` 智能 AI 查询融合
  - `ocr/` 离线 OCR 引擎（tesseract wasm + 训练数据）
- 原生壳（本仓库默认不含，见下方「原生壳」）：
  - `native-shell/win-gjian-webview2`（Windows WebView2）
  - `native-shell/uos-gujian-pyqt6`（UOS PyQt6）

## 构建与运行

- **Android**：把 `assets/` 打进 APK（通用 WebView 壳）。
- **Windows**：`native-shell/win-gujian-webview2`（WebView2）。
- **UOS**：`native-shell/uos-gujian-pyqt6`（PyQt6 + deb 包，架构对照：3A3000/3A4000→mips64el，3A5000+→loongarch64，FT2000/鲲鹏→arm64，其余→amd64）。
- **iOS**：PWA + 静态 https。

## AI Key 配置（重要）

`assets/ai_seed.js` 为**私有文件**（含个人 OpenRouter Key），已被 `.gitignore` 忽略，不会入库。
首次克隆后请：

```bash
cp assets/ai_seed.demo.js assets/ai_seed.js
```

然后在 APP「设置 → 智能AI设置」中填写你自己的 Key。未配置时 AI 功能不可用，但其余功能正常。

## 版本

当前 `3.7.4`（见 `assets/version.json`，本文件为版本唯一真相源）。
