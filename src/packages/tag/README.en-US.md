---
component: tag
title: Tag
preview: https://didi.github.io/mand-mobile/examples/#/tag
---

# Tag

For showing the area status

### Import

```javascript
import { Tag } from  'mand-mobile-next'

Vue.createApp().component(Tag.name, Tag)
```

### Code Examples

<demo-wrapper
  src="src/packages/tag/demo"
/>

<!-- DEMO -->

### API

#### Tag Props

| Props | Description | Type | Default | Value |
|----|-----|------|------|------|
|size| size of tag  |String|`large`|`tiny`, `small`, `large`|
|shape| shape of tag |String|`square`|`square`, `circle`, `fillet`, `quarter`, `coupon`,`bubble`|
|sharp|angle of tag|String|-|`top-left`, `top-right`, `bottom-left`, `bottom-right`|
|type| style of tag |String|`ghost`|`fill`, `ghost`|
|fill-color| background color, `rgba` or `hex number`|String|`rgba(0,0,0,0)`|-|
|font-weight| font weight |String|`normal`|`normal`, `bold`, `bolder`|
|font-color| font color, `rgba` or `hex number`|String|`#fc9153`|-|
