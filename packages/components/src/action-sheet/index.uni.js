import ActionSheetOptions from './action-sheet'

// https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html
function actionSheetFactory() {
  let ActionSheet = {}

  const noop = function() {}
  ActionSheet.create = function({itemColor = '', itemList = [], success = noop, fail = noop, complete = noop}) {
    uni.showActionSheet({
      itemColor: itemColor,

      itemList,

      success,

      fail,

      complete: complete,
    })
  }

  ActionSheet.component = ActionSheetOptions

  return ActionSheet
}

export default actionSheetFactory()
