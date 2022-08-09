# 赛行工作室（10509）管理系统

## 技术栈
    ```
        create-react-app
        typescript
        antd
    ```
## 调试方式
    本地 yarn start

    打包 yarn bulid

## src目录
    index.tsx           入口文件
    types.ts            公用类型接口
    component           全局配置组件
        Route           路由配置（ 目前是路由全部挂载，侧边栏区分显示，单独路由后端再鉴权，有优化空间 ）
        Screen          布局/侧边栏
        SxTable         同antd，table组件，做了相关配置
    libs                工具函数/高阶组件
    pages               路由页面
    UIComponent         公用样式组件