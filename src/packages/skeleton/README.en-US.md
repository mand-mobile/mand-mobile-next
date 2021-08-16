---
component: skeleton
title: Skeleton
preview: https://didi.github.io/mand-mobile/examples/#/Skeleton
---

# Skeleton

Skeleton screen, generally used to display the loading state of the general structure of the page before the data has been loaded 

### Import

```javascript
import { Skeleton } from  'mand-mobile-next'

Vue.createApp().component(Skeleton.name, Skeleton)
```

### Code Examples

<demo-wrapper
  src="src/packages/skeleton/demo"
/>

<!-- DEMO -->

### API

#### Skeleton Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|loading|display the skeleton loading |Boolean|true|-|
|avatar|display avatar placeholders|Boolean|false|-|
|avatar-size|avatar placeholders' size|String|md| sm, md, lg |
|title|display the title placeholders|Boolean|false|-|
|title-width|title placeholders width|Number,String| 40%|-|
|row|number of rows|Number|3|-|
|row-width|rows' width|String,Number,Array\<String\|Number\>|100%|-|
