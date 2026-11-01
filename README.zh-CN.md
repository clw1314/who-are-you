# 你是谁

[English](README.md) · **简体中文**

网站眼中的你是谁？[你是谁](https://who.1ms.dog) 运行任何网站在你打开它的那一刻都能运行的嗅探器，全程不弹任何授权提示，然后把结果写成一段填空的话：你可能的国籍、所在城市、语言和时区、设备、浏览器、屏幕和显卡、网络、偏好、从字体看出的职业，以及浏览器指纹。

接着它像网站识别伪装那样，把这些信息互相对比；并列出全部 70 个嗅探器、每个的读取方式和读到的结果。

**在线使用：** https://who.1ms.dog

## 能看到什么

- **画像**：一段话，每个空都由嗅探器填上。鼠标放在空格上，会显示它来自哪些嗅探器（对应的行会高亮）。只有年龄是留空的：浏览器里没有任何地方透露年龄，页面会直接说明，而不是瞎猜。
- **伪装检测**：想隐藏自己时最要紧的 9 项：
  - 系统时区和 IP 所在时区
  - 浏览器语言和 IP 所在国家
  - DNS 泄露：实际替你解析域名的 DNS 解析器在哪个国家，和 IP 是否一致
  - 分流：国内网站、国外 IP 服务、ChatGPT、Claude、Cloudflare 和本站看到的出口是否不同
  - WebRTC：STUN 服务器看到的公网地址是否不同于网页看到的
  - 机房网络（云、托管、VPN 服务商）
  - User-Agent 和 Client Hints、WebGL 显卡暴露的真实系统
  - 指纹是稳定的（可追踪）还是随机的
  - 自动化（`navigator.webdriver`）
- **全部嗅探器**，分组列出：
  - *服务器看到的*：IP、Cloudflare 地理位置（城市、坐标、ASN、时区）、反向解析、最近的边缘节点和 TCP 往返时间、HTTP/TLS 版本和加密套件、抗量子密钥交换和 ECH、Cloudflare WARP、TLS ClientHello 指纹、你的时钟偏差、DNS 解析器（edns.ip-api.com）、WebRTC 公网和内网地址
  - *出口*：每类目的地看到的地址，以及 IPv4 和 IPv6 出口（Cloudflare Radar）
  - *请求头*：User-Agent、Accept-Language、Sec-CH-UA、平台、压缩方式、DNT/GPC、来源页
  - *语言和地区*：`navigator.languages`、区域设置、时区、12/24 小时制、每周第一天、数字和日期格式、键盘布局、语音朗读
  - *设备*：系统和版本、浏览器、架构、屏幕、刷新率、显示器数量、显卡（WebGL 和 WebGPU）、CPU 线程、内存、触控、电池、网络连接、摄像头和麦克风（只计数，不打开）、视频解码、DRM、存储配额
  - *浏览器设置*：配色、减少动画、色域和 HDR、DNT/GPC、Cookie、已授予或已拒绝的权限、PDF 阅读器、webdriver、广告拦截、标签页历史、已装字体
  - *指纹*：Canvas、WebGL、音频、字体列表、综合指纹，以及浏览器是否会随机化它们

所有行在读取之前就已画好，哪个嗅探器先返回就先填哪一行；那段话等所有空都齐了才一次填好，页面不会跳动。另有一个按钮可以模糊地址和位置，方便截图。

## 隐私

为了找出你的出口和 DNS 解析器，页面会直接访问几个外部服务（每行都写着名字：IPIP.NET、IP.SB、chatgpt.com、claude.ai 和 www.cloudflare.com 上的 Cloudflare trace、Cloudflare Radar、ip-api 的 DNS 服务器、两个 STUN 服务器），它们能看到你的地址，和你访问任何网站时一样。其余都在浏览器里读取，不会离开浏览器。Worker 只回答一个请求 `GET /api/me`，内容是它从这个请求里本来就能看到的：地址、Cloudflare 对它的 `request.cf` 数据、请求头（不含 Cookie 和 Cloudflare 自己加的）、地址的 PTR 记录和服务器时钟。不存储，不记日志。

## 自己部署

```bash
git clone https://github.com/yt1988/who-are-you
cd who-are-you
npm ci
npm run dev          # wrangler dev，http://localhost:8795（本地也会拿到 Cloudflare 的地理位置）
npm test             # 检查 public/ 是否最新，并跑单元测试
npx wrangler deploy  # 部署名为 who 的 Worker，再到控制台绑定自定义域名
```

`npm run build` 从 `src/` 重新生成 `public/`。用 `SITE_URL` 指定你自己的域名（canonical、sitemap、llms.txt）。`npm run tz` 从 tz 数据库更新时区到国家的对照表。

## 文件

```
src/worker.js     GET /api/me：服务器看到的内容
src/sniffers.mjs  每个嗅探器的行、画像的空格和伪装检测项
src/infer.mjs     读数的含义：系统、浏览器、显卡、键盘、机房、国籍、检测（有单元测试）
src/app.js        页面：运行嗅探器，填写各行、那段话和检测结果
src/i18n/         10 种语言
scripts/build.mjs 生成 public/（每种语言一页、CSP、sitemap）
```

## 许可

MIT
