---
component: swiper
title: Swiper
preview: https://didi.github.io/mand-mobile/examples/#/swiper
---

# Swiper

Carousel, used to cycle through a set of pictures or cards

### Import

```javascript
import { Swiper, SwiperItem } from  'mand-mobile-next'

Vue.createApp().component(Swiper.name, Swiper)
Vue.createApp().component(SwiperItem.name, SwiperItem)
```

### Code Examples

<demo-wrapper
  src="src/packages/swiper/demo"
/>

### API

#### Swiper Props

| Props | Description | Type | Default | Options/Note |
|---|---|---|---|---|
|autoplay|the interval (ms) of autoplay; set `0` to disable autoplay|Number|`3000`|`0`, `[500, +Int.Max)`|
|transition|animation effects|String|`slide`|`slide`, `slideY`, `fade`|
|default-index|default selected index|Number|`0`|`[0, length - 1]`|
|has-dots|display the indication dots|Boolean|`true`|-|
|is-prevent|prevent the default event|Boolean|`true`|set it to `false` when binding click event to `swiper-item`|
|is-loop|infinite loop|Boolean|`true`|-|
|dragable|-|Boolean|`true`|-|
|use-native-driver|enable 3D acceleration|Boolean|`true`|-|

#### Swiper Events

##### @beforeChange(from, to)

event to be triggered before the slide is changed

| Args | Description | Type |
|----|-----|------|
| from     | the current index | Number          |
| to     | the next index | Number          |

##### @afterChange(from, to)

event to be triggered after the slide is changed

| Args | Description | Type |
|----|-----|------|
| from   | the current index | Number          |
| to     | the next index  | Number          |

### Swiper Methods

#### getSwiperInstance

get `Bscroll` instance

### resetSwiper

reset `swiper` for asynchronous rendering