# Mand-mobile vue3

mand-mobile + vue3.0 + vite

## 现状

Vue团队已经宣布 Vue3.0 不在兼容 IE11，且 Vue3 的新特性会反向兼容到 Vue2.7 之中；因此在相当一段时间内，mand-mobile2.x 还会持续的维护和迭代；特别是 mand-mobile-next 对跨平台的支持，会长期维护。但是，社区之中主流的组件库都已经升级到 Vue3.x 且 release，mand-mobile 对 Vue3 语法的适配可以提上日程。

## mand-mobile-vue3 与 mand-mobile-next 之间的关系

mand-mobile-next 可以在原来的版本之上继续迭代，维持 2.x 的版本；mand-mobile-vue3 可以走 @next tag 发包。mand-mobile-vue3 希望是自己的单独仓库中进行开发。

## mand-mobile-vue3 Feature

- 基于 typescript 开发
- 基于 vite 的开发容器
- 基于 vue-press（vite） 的组件文档，（已有）
- vite rollup esbuild 的构建流
- 合法的 esm / iife 构建产物
- 更为抽象的组件 VCA
- 细腻的交互动画和细节
- 完备的类型推导
- 服务端渲染

## 开发计划

- mand-mobile-next 国际化 @zouhang (**5月底前完成**)
- mand-mobile-next UI 走查、开源、试用 (**6月中旬前完成**)
- mand-mobile-vue3 (**6月底前完成**)

### mand-mobile-vue3

- 基础组件 (**5月底之前开发完毕**)
  - ActionBar
  - ActivityIndicator
  - Button
  - CellItem
  - DetailItem
  - DropMenu
  - Icon
  - ImageReader
  - ImageViewer
  - NoticeBar
  - Progress
  - Skeleton
  - Stepper
  - Steps
  - Swiper
  - TabBar
  - Tabs
  - Tag
- 表单 (**6月第一周开发完毕**)
  - Agree
  - Check
  - Codebox
  - Field
  - InputItem
  - NumberKeyboard
  - Radio
  - Slider
  - Switch
  - TextareaItem
- 操作反馈 (**6月第二周开发完毕**)
  - ActionSheet
  - DatePicker
  - Dialog
  - Picker
  - Popup
  - Selector
  - TabPicker
  - Tip
  - Toast
  - Transition
- 业务组件 (**6月第三周开发完毕**)
  - Amount
  - Bill
  - Captcha
  - Cashier
  - Landscape
  - ResultPage
  - WaterMark
- 手势 (**6月第三周开发完毕**)
  - ScrollView
