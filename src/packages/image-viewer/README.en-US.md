---
component: image-viewer
title: ImageViewer
preview: https://didi.github.io/mand-mobile/examples/#/image-viewer
---

# ImageViewer

For  browsing multiple pictures and swiping to switch pictures

### Import

```javascript
import { ImageViewer } from  'mand-mobile-next'

Vue.createApp().component(ImageViewer.name, ImageViewer)
```

### Code Examples

<demo-wrapper
  src="src/packages/image-viewer/demo"
/>

### API

#### ImageViewer Props

|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| visible | viewer display | Boolean | `false` |
| list |show picture list | Array\<String\> | `[]` | -|
| default-index | initialize the index of displayed image | Number | `0` | - |
| has-dots | display the index of picture| Boolean | `true` | - |
| deletable | show delete icon | Boolean | `false` | - |
