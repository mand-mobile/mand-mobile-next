<template>
  <div class="md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-0">
    <md-button class="md-button" @click="toggleKeyboard(0)">
      {{ isKeyBoardShow0 ? '收起键盘' : '唤起键盘，无小数点' }}
    </md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow0"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>

    <md-button class="md-button" @click="toggleKeyboard(1)">
      {{ isKeyBoardShow1 ? '收起键盘' : '唤起键盘，无小数点' }}
    </md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow1"
      hide-dot
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>

    <md-button class="md-button" @click="toggleKeyboard(2)">
      {{ isKeyBoardShow2 ? '收起键盘' : '唤起键盘，无小数点' }}
    </md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow2"
      @input="handler"
      :text-render="keyFormatter"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>
    <div class="md-example-display" v-show="isKeyBoardShow0 || isKeyBoardShow1 || isKeyBoardShow2" v-text="number"></div>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import NumberKeyboard from 'mand-mobile/lib/number-keyboard'

export default {
  components: {
    'md-button': Button,
    'md-number-keyboard': NumberKeyboard,
  },
  data() {
    return {
      isKeyBoardShow0: false,
      isKeyBoardShow1: false,
      isKeyBoardShow2: false,
      number: '',
    }
  },
  methods: {
    toggleKeyboard(index) {
      const isKeyBoardShow = this.$data[`isKeyBoardShow${index}`]
      this.$set(this.$data, `isKeyBoardShow${index}`, !isKeyBoardShow)
    },
    keyFormatter(val) {
      if (val === '.') {
        return 'x'
      }
    },
    onNumberEnter(val) {
      this.number += val
    },
    onNumberDelete() {
      if (this.number === '') {
        return
      }
      this.number = this.number.substr(0, this.number.length - 1)
    },
    handler(val) {
      // eslint-disable-next-line no-console
      console.log(this.isKeyBoardShow)
      // eslint-disable-next-line no-console
      console.log(val)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    describe: '有确认键和小数点，一般用于价格或金额输入',
  },
  'en-US': {
    describe: 'With confirmation key and decimal point, generally used for price or amount input',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-example-child
  >>> .md-button
    display block
    margin-bottom 10px
.md-example-child-number-keyboard-0
  >>> .md-button
    display block
    margin-bottom 10px
  .md-example-display
    position fixed
    top 30%
    left 50%
    z-index 9999
    transform translate(-50%, -50%)
    font-size 120px
    text-shadow 0 4px 20px #666
.md-button
  display block
  margin-bottom 10px
</style>
