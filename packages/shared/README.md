# `@mand-mobile/shared`

Internal utility functions, stylus, and constants shared across `@mand-mobile` packages.

## Usage

``` typescript
import * as utils from '@mand-mobile/shared/utils'
```

## Structure

├─src
|  ├─util
|  |  ├─debug.ts
|  |  ├─env.ts
|  |  ├─formate.ts
|  |  ├─functions.ts
|  |  ├─index.ts
|  |  └─window.ts
|  ├─style
|  |   ├─global.styl
|  |   ├─transition.styl
|  |   ├─mixin
|  |   |   ├─theme.basic.styl
|  |   |   ├─theme.components.styl
|  |   |   ├─theme.variable.styl
|  |   |   └util.styl
|  |   ├─images
|  |   |   ├─keyboard-del.png
|  |   |   ├─keyboard-hide.png
|  |   |   ├─spinner.svg
|  |   |   ├─success-color.svg
|  |   |   └warn-color.svg
|  ├─mixin
|  |   └proxy.ts
