---
title: Ruler 刻度尺
preview: https://didi.github.io/mand-mobile/examples/#/ruler
---

可滑动刻度尺

## 引入

```javascript
import { Ruler } from 'mand-mobile'

Vue.component(Ruler.name, Ruler)
```

## 代码演示
<!-- DEMO -->


## API

### Ruler Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|value|双向绑定的值|Number|0| |
|scope|刻度尺范围|Number[]|[0, 100]| |
|step|刻度尺每一大格步数|Number|10| |
|unit|刻度尺每一小格步数|Number|1| |
|min|最小可滑动位置|Number|0| |
|max|最大可滑动位置|Number|100| |
|scale-mark-spacing|刻度线间距|Number|30| |
|scale-mark-color|刻度线颜色|String|`#858B9C`| |
|scale-text-color|刻度文案颜色|String|`#C5CAD5`| |
|scale-text-size|刻度文案大小|Number|22| |
|scale-text-font|刻度文案字体|String|`"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`| |
|scale-text-position|刻度文案位置|String|`top`|可选`top`, `bottom`|
|scale-text-render |自定义刻度文案|Function| |自定义函数应该返回字符串|
|is-vibrate |刻度值变化时震动|Boolean|`true`| |

### Ruler Methods

#### refresh
重新初始化刻度尺，如当容器元素尺寸变化时


### Ruler Events

#### @change(currentValue)
值发生变化事件
