<template>
  <div class="md-example-child md-example-child-captcha">
    <md-field title="文案">
      <md-input-item
        title="标题"
        v-model="title"
      ></md-input-item>
      <md-input-item
        title="插槽内容"
        v-model="content"
      ></md-input-item>
      <md-input-item
        title="短信验证码"
        value="1234"
        readonly
      ></md-input-item>
    </md-field>

    <md-field title="配置">

      <md-field-item
        title="限制验证码长度"
        customized
        align="right">
        <md-switch v-model="limit"></md-switch>
      </md-field-item>

      <md-input-item
        title="验证码长度"
        type="tel"
        v-model="maxlength"
      ></md-input-item>

      <md-field-item
        title="采用掩码"
        customized
        align="right">
        <md-switch v-model="mask"></md-switch>
      </md-field-item>

      <md-field-item
        title="使用系统键盘"
        customized
        align="right">
        <md-switch v-model="system"></md-switch>
      </md-field-item>

    </md-field>
    <md-button @click="next">确定</md-button>

    <md-captcha
      ref="captcha"
      v-model="show"
      :title="title"
      :maxlength="limit ? parseFloat(maxlength) : -1"
      :system="system"
      :mask="mask"
      :appendTo="false"
      @submit="submit"
      @show="showHandler"
      @hide="hideHandler"
      @send="onSend"
    >
      {{content}}
    </md-captcha>
	</div>
</template>

<script>
/* eslint-disable */
import Button from '../../../button'
import Toast from '../../../toast'
import InputItem from '../../../input-item'
import Field from '../../../field'
import FieldItem from '../../../field/item'
import Switch from '../../../switch'
import Captcha from '../../index'

export default {
  name: 'captcha-demo',
  /* DELETE */
  title: '自定义',
  titleEnUS: 'Customize',
  height: 650,
  /* DELETE */
  components: {
    'md-button': Button,
    'md-captcha': Captcha,
    'md-input-item': InputItem,
    'md-field': Field,
    'md-field-item': FieldItem,
    'md-switch': Switch,
  },
  data() {
    return {
      show: false,
      appendTo: false,
      title: '输入验证码',
      content: '验证码已发送至 186****5407',
      limit: true,
      maxlength: '4',
      mask: false,
      system: false,
    }
  },
  methods: {
    next() {
      this.show = true
    },
    submit(val) {
      const max = parseFloat(this.maxlength)
      setTimeout(() => {
        if (!this.limit || max < 0 || val.length === max) {
          if (val !== '1234') {
            this.$refs.captcha.setError('验证码错误，请重新输入')
          } else {
            this.show = false
            console.log(`你输入了${val}`)
          }
        }
      }, 300)
    },
    onSend() {
      console.log('click resend button.')
    },
    showHandler() {
      console.log('show')
    },
    hideHandler() {
      console.log('hide')
    },
  },
}

</script>

<style>
.md-example-child-captcha {
  padding: 20px;
}
.md-field {
  margin-bottom: 40px;
}
</style>
