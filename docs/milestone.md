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
- 合法的 esm / umd 构建产物
- 更为抽象的组件 VCA
- 细腻的交互动画和细节
- 完备的类型推导
- 服务端渲染

## 开发计划

- [x] 脚手架
- [x] 新增组件、template、cz husky 等工程脚本
- [ ] 18个基础组件 开发中
- [ ] 20个 FeedBack/Form 待开发
- [ ] Scroll 待开发
- [ ] 单元测试，与开发同步进行

## 开源计划

开发完毕，审核过了就开源

## 开发计划（含mand-mobile-next）

## 任务

- mand-mobile-next 国际化 @zouhang (**5月底前完成**)
- mand-mobile-next UI 走查、开源、试用 (**6月中旬前完成**)
- mand-mobile-vue3 (**6月底前完成**)

### mand-mobile-vue3

- 基础组件 (**5月底之前开发完毕**)
  - [x] ActionBar
  - [x] ActivityIndicator
  - [x] Button
  - [x] CellItem
  - [x] DetailItem
  - [x] DropMenu
  - [x] Icon
  - [x] ImageReader
  - [x] ImageViewer
  - [x] NoticeBar
  - [x] Progress
  - [x] Skeleton
  - [x] Stepper
  - [x] Steps
  - [x] Swiper
  - [x] TabBar
  - [x] Tabs
  - [x] Tag
- 表单 (**6月第一周开发完毕**)
  - [x] Agree
  - [x] Check
  - [ ] Codebox
  - [x] Field
  - [x] InputItem
  - [ ] NumberKeyboard
  - [x] Radio
  - [x] Slider
  - [x] Switch
  - [x] TextareaItem
- 操作反馈 (**6月第二周开发完毕**)
  - [x] ActionSheet
  - [ ] DatePicker
  - [x] Dialog
  - [x] Picker
  - [x] Popup
  - [x] Selector
  - [x] TabPicker
  - [x] Tip
  - [x] Toast
  - [x] Transition
- 业务组件 (**6月第三周开发完毕**)
  - [x] Amount
  - [x] Bill
  - [ ] Captcha
  - [ ] Cashier
  - [ ] Chart
  - [x] Landscape
  - [x] ResultPage
  - [ ] Ruler
  - [x] WaterMark
- 手势 (**6月第三周开发完毕**)
  - [x] ScrollView

#### 开发人员

xupinge,liman,xiaojiahui,zouhang

### mand-mobile-next 国际化

参考 mand-mobilex@2.5.17 实现即可 (**5月底实现**)

#### 开发人员

zouhang

### mand-mobile-next UI 走查 *WIP*

### mand-mobile-next 应用与开源 *WIP*
