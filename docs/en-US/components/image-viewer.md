---
component: image-viewer
title: ImageViewer
preview: https://didi.github.io/mand-mobile/examples/#/image-viewer
---

# ImageViewer


For	 browsing multiple pictures and swiping to switch pictures

### Import

```javascript
import { ImageViewer } from 'mand-mobile'

Vue.createApp().component(ImageViewer.name, ImageViewer)
```


### Code Examples

<demo-wrapper
  src="src/packages/image-viewer/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/image-viewer/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### ImageViewer Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| v-model | viewer display | Boolean | `false` |
| list |show picture list | Array\<String\> | `[]` | -|
| initial-index | initialize the index of displayed image | Number | `0` | - |
| has-dots | display the index of picture| Boolean | `true` | - |

