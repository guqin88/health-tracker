 # 健康追踪 PWA 实施计划
 
 > **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
 
 **Goal:** 构建纯客户端 PWA，在 iPhone Safari 上记录五大维度健康数据，所有数据存储在手机本地 IndexedDB，支持一键导出 MD 文件。
 
 **Architecture:** 单 HTML 文件内联 CSS/JS（仅 manifest.json/sw.js/图标独立），IndexedDB 作为唯一数据层。
 
 **Tech Stack:** 纯 HTML5 / CSS3 / ES6+，原生 IndexedDB API，Service Worker，无第三方依赖。
 
 ## Global Constraints
 - 无第三方依赖
 - 优先适配 iOS Safari 竖屏，Android Chrome 次之
 - 全离线可用
 - 所有数据仅存 IndexedDB
 - 触摸目标 ≥ 44pt
 - 支持 safe area
 
 ---
 
 ## File Structure
 ```
 D:\1.工作\2.个人\1.工具\4.健康\
 ├── index.html    # 主应用（内联 CSS + JS）
 ├── manifest.json # PWA 清单
 ├── sw.js         # Service Worker
 └── icons/
     ├── icon-192.png
     └── icon-512.png
 ```
 
 ## Tasks
 
 ### Task 1: 项目脚手架 + PWA 基础
 
 **Files:** index.html, manifest.json, sw.js, icons/
 
 - [ ] 创建目录结构
 - [ ] 创建 manifest.json（name: 健康追踪, display: standalone, theme_color: #4A90D9）
 - [ ] 创建 sw.js（Cache-First 策略，缓存 index.html + manifest.json）
 - [ ] 创建占位图标（canvas 生成纯色 192x192 和 512x512 PNG）
 - [ ] 创建 index.html 骨架（viewport-fit=cover, apple-mobile-web-app-capable, body 含 #app 容器）
 
 ### Task 2: IndexedDB 数据层
 
 **Files:** index.html (内部 <script> 模块)
 
 **Produces:** window.DB 对象
 - DB.open() / DB.save(id, data) / DB.get(id) / DB.getAll() / DB.getMonth() / DB.delete()
 
 - [ ] 实现 DB 初始化（创建 objectStore "records" + updatedAt 索引）
 - [ ] 实现 save/get/getAll/getMonth/delete 方法
 - [ ] 定义 EMPTY_RECORD 默认空数据模板（完整覆盖所有字段）
 - [ ] 浏览器验证：保存一条数据然后读取，确认持久化
 
 ### Task 3: 主页维度选择器 + 进度指示
 
 **Files:** index.html (CSS + 渲染逻辑)
 
 - [ ] 定义 iOS 风格 CSS（safe area, 卡片圆角, SF Pro 字体, 阴影）
 - [ ] 渲染 5 维度卡片（名称 + 分数状态 + 点击进入编辑）
 - [ ] 顶部日期显示 + 水平进度条
 - [ ] 加载今日数据更新卡片状态
 
 ### Task 4: 各维度表单渲染
 
 **Files:** index.html (表单引擎)
 
 - [ ] 实现通用控件：renderRadio / renderCheckbox / renderNumber / renderText / renderScore
 - [ ] 实现生理躯体表单（睡眠6控件 + 饮食11控件 + 运动组 + 体征2控件 + 就医5填写框）
 - [ ] 实现心理情绪表单（情绪多选 + 心智状态 + 压力/恢复力4控件 + 内在接纳度2组）
 - [ ] 实现时间与行为表单（任务执行5控件 + 时间分配2控件 + 节律2控件 + 止损2控件）
 - [ ] 实现人际亲密表单（角色区分沟通 + 社交3控件 + 边界 + 支持）
 - [ ] 实现精神目标表单（目标清晰3控件 + 价值感知2控件 + 秩序2控件 + 动力1控件）
 - [ ] 实现自动保存（每个控件 change 事件 → DB.save()）
 - [ ] 浏览器验证：填写→返回→重新进入，数据回显正确
 
 ### Task 5: 历史日历视图
 
 **Files:** index.html
 
 - [ ] 实现月历组件（年/月切换，点击日期选中）
 - [ ] 日期状态标记（完成绿点、未完成橙点、空天无标记）
 - [ ] 点击历史日期加载该天数据进入编辑模式
 
 ### Task 6: MD 导出
 
 **Files:** index.html
 
 - [ ] 实现 recordToMarkdown() — 结构化数据转 MD 格式
 - [ ] 实现 downloadMarkdown() — Blob → URL.createObjectURL → 触发下载 .md
 - [ ] 实现导出选项 UI（导出今天 / 导出本周 / 导出全部）
 - [ ] 浏览器验证：写入数据 → 导出 → 确认 MD 文件格式正确
 
 ### Task 7: 导航整合 + iOS 适配
 
 **Files:** index.html
 
 - [ ] 实现底部 Tab 导航（今日 / 历史 / 导出）
 - [ ] safe area CSS + iOS 特殊适配（-webkit-tap-highlight-color, overscroll-behavior, font-size:16px）
 - [ ] 全流程端到端验证：打开 → 填写 5 维度 → 查看进度 → 历史视图 → 导出 MD
