---
component: textarea-item
title: TextareaItem
preview: https://didi.github.io/mand-mobile/examples/#/TextareaItem
---

# TextareaItem

Multi-line text input 

### Import

```javascript
import { TextareaItem } from  'mand-mobile-next'

Vue.createApp().component(TextareaItem.name, TextareaItem)
```

### Code Examples

<demo-wrapper
  src="src/packages/textarea-item/demo"
/>

### API

#### TextareaItem Props

| Props                                             | Description                                     | Type          | Default | Note               |
| ------------------------------------------------- | ----------------------------------------------- | ------------- | ------- | ------------------ |
| title                                             | title of textarea                               | String        | -       | -                  |
| placeholder                                       | placeholder of textarea                         | String        | -       | -                  |
| v-model                                           | value of textarea                               | String        | -       |                    |
| max-length                                        | max length of textarea                          | String/Number | -       | -                  |
| autosize                                          | Dose the Textarea  resize with content          | Boolean       | `false` | -                  |
| max-height                                        | The max height of textarea with `autosize=true` | String/Number | `'40'`  | rely on `autosize` |
| solid                                             | the width of title is fixed or not              | Boolean       | `true`  |                    |
| readonly                                          | readonly                                        | Boolean       | `false` | -                  |
| disabled                                          | disabled                                        | Boolean       | `false` | -                  |
| clearable   | clearable                                       | Boolean       | `false` | -                  |
| rows                                              | rows                                            | String/Number | `'3'`   | -                  |
| error                                             | error message                                   | String        | -       | -                  |

#### TextareaItem Slots

##### footer

the slot of footer

#### TextareaItem Events

##### focus()

Input gets focus

##### blur()

Input loses focus

##### getValue()

Get value of input

#### TextItem Events

##### @focus(name)

Textarea gets focus

##### @blur(name)

Textarea loses blur

##### @change(name, value)

Change the value of Textarea

##### @keyup(name, event)

key press

##### @keydown(name, event)

key release
