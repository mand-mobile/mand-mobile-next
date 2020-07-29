<template>
  <div class="md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-0">
    <md-button class="md-button" @click="toggleKeyboard(0)">{{ buttonText0 }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow[0]"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>

    <md-button class="md-button" @click="toggleKeyboard(1)">{{ buttonText1 }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow[1]"
      hide-dot
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>

    <md-button class="md-button" @click="toggleKeyboard(2)">{{ buttonText2 }}</md-button>
    <md-number-keyboard
      v-model="isKeyBoardShow[2]"
      @input="handler"
      :text-render="keyFormatter"
      @enter="onNumberEnter"
      @delete="onNumberDelete"
    ></md-number-keyboard>
    <div class="md-example-display" v-show="isKeyBoardShow" v-text="number"></div>
  </div>
</template>

<script>import Button from '../../../button'
import NumberKeyboard from '../../index'

export default {
  name: 'number-keyboard-demo',
  /* DELETE */
  describe: '有确认键和小数点，一般用于价格或金额输入',
  describeEnUS: 'With confirmation key and decimal point, generally used for price or amount input',
  /* DELETE */
  components: {
    'md-button': Button,
    'md-number-keyboard': NumberKeyboard,
  },
  data() {
    return {
      isKeyBoardShow: [],
      number: '',
    }
  },
  computed: {
    buttonText0() {
      return this.isKeyBoardShow[0] ? '收起键盘' : '唤起键盘，有小数点'
    },
    buttonText1() {
      return this.isKeyBoardShow[1] ? '收起键盘' : '唤起键盘，有小数点'
    },
    buttonText2() {
      return this.isKeyBoardShow[2] ? '收起键盘' : '唤起键盘，有小数点'
    },
  },
  methods: {
    toggleKeyboard(index) {
      this.$set(this.isKeyBoardShow, index, !this.isKeyBoardShow[index])
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
