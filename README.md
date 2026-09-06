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
- `native-shell/` —— 各平台原生壳源码（仅源码入库，构建产物/备份/签名经 `.gitignore` 排除）
  - `android-gujian/`（Android 原生壳，包名 `com.gujian.travel`）：`AndroidManifest.xml`、`src/com/gujian/travel/MainActivity.java` + `LargeFileManager.java`、`res/`（图标+strings）、`build_apk.sh` + `gen_icons.py`。`assets/` 是 Web 源码拷贝，构建期生成、已忽略。
  - `win-gujian-webview2/`（Windows WebView2 原生壳）：`Program.cs` 加载器、`ShuiliMap.csproj`、`app.ico`、`build_msi.bat` + `build_msi.wxs`（WiX 一键打 MSI）
  - `uos-gujian-pyqt6/`（UOS 原生壳）：`main.py`（PyQt6 + QWebEngineView 承载网页）、`build_deb.sh`（dpkg-deb 一键打包，四类国产架构通用）
  - `gujian-ios/`（iOS PWA 原生壳）：`build_ios_zip.py`（把 `assets/` + `pwa-shell/` 打包成可托管 HTTPS 的离线 PWA）+ `pwa-shell/`（manifest.webmanifest / sw.js / icons/ / DEPLOY_README.txt，古建品牌）

## 构建与运行

> 各原生壳构建前需先把 `assets/` 同步成壳内的 `webroot/`（即「网页资源」目录），再运行对应构建脚本。`webroot/` 是 `assets/` 的构建期拷贝，已被 `.gitignore` 排除，切勿手动提交。iOS 例外：直接用仓库内的 `gujian-ios/pwa-shell/` 作 PWA 壳，无需 webroot。

- **Android**：`native-shell/android-gujian/`（包名 `com.gujian.travel`，Eclipse/Ant 风格工程）
  - 把 `assets/` 拷为壳内 `assets/`，`keytool` 生成/使用自己的 `.jks` 签名，运行 `bash build_apk.sh` 出 `古建景点打卡.apk`（`.jks`/`.apk`/`.class`/`.dex` 等已忽略，切勿提交密钥）
- **Windows**：`native-shell/win-gujian-webview2/`（WebView2）
  - 开发：`dotnet build`（.NET 8 + Microsoft.Web.WebView2）
  - 发布：`dotnet publish -c Release` 得到 `古建景点打卡.exe`，再把 `assets/` 拷为壳内 `webroot/`，双击 `build_msi.bat`（需先装 WiX Toolset）生成 `古建景点打卡_Setup.msi`
- **UOS**：`native-shell/uos-gujian-pyqt6/`（PyQt6 + deb 包）
  - 先把 `assets/` 拷为壳内 `webroot/`，再 `sudo bash build_deb.sh`（可 `ARCH=mips64el` 显式指定架构；架构对照：3A3000/3A4000→mips64el，3A5000+→loongarch64，FT2000/鲲鹏→arm64，其余→amd64）
- **iOS**：`native-shell/gujian-ios/`（PWA + 静态 https）
  - `python3 native-shell/gujian-ios/build_ios_zip.py` 生成 `apple-package/古建景点打卡_iOS_<ver>_可托管.zip`；解压到 HTTPS 站点目录，iOS Safari「添加到主屏幕」即得类原生 App（需 HTTPS；Service Worker 离线缓存 App Shell）

## AI Key 配置（重要）

`assets/ai_seed.js` 为**私有文件**（含个人 OpenRouter Key），已被 `.gitignore` 忽略，不会入库。
首次克隆后请：

```bash
cp assets/ai_seed.demo.js assets/ai_seed.js
```

然后在 APP「设置 → 智能AI设置」中填写你自己的 Key。未配置时 AI 功能不可用，但其余功能正常。

## 版本

当前 `3.7.4`（见 `assets/version.json`，本文件为版本唯一真相源）。
