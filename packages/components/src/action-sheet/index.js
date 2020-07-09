import ActionSheetOptions from './action-sheet'
// #ifdef H5
import ActionSheetFactory from '../../platform/web/component/action-sheet'
// #endif 
// #ifdef MP
import ActionSheetFactory from '../../platform/uniapp/component/action-sheet'
// #endif 

export default ActionSheetFactory(ActionSheetOptions)
