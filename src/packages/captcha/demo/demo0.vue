<script lang="ts">
export default {
  name: 'CaptchaDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdCaptcha from 'mand-mobile/captcha'
import Button from 'mand-mobile/button'
import Toast from 'mand-mobile/toast'
import MdInputItem from 'mand-mobile/input-item'
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'
import MdSwitch from 'mand-mobile/switch'
import { focusAndOpenKeyboard } from 'mand-mobile/codebox'
import { ref, watch } from 'vue'

const show = ref(false)
const limit = ref(false)
const title = ref('输入验证码')
const content = ref('验证码已发送至 186****5407')
const maxlength = ref(4)
const mask = ref(false)
const system = ref(false)
const isView = ref(false)

const submitHandler = (code: string) => {
  Toast.info(`你输入了${code}`)
  show.value = false
}

const button = ref<HTMLElement | undefined>(undefined)
let remove: any = null
const clickHandler = () => {
  if (system.value) {
    button.value &&
      (remove = focusAndOpenKeyboard(button.value))
  }
  show.value = !show.value
}
/**
 * Fix iOS safari input autofus
 */
watch(show, (val) => {
  if (!val) {
    setTimeout(() => remove?.(), 0)
  }
})
</script>

<template>
  <div class="md-example-child md-example-child-captcha">
    <md-field title="文案">
      <md-input-item
        v-model="title"
        title="标题"
      ></md-input-item>
      <md-input-item
        v-model="content"
        title="插槽内容"
      ></md-input-item>
      <md-input-item
        title="短信验证码"
        model-value="5555"
        readonly
      ></md-input-item>
    </md-field>

    <md-field title="配置">
      <md-field-item
        title="是否内联"
        customized
        align="right"
      >
        <md-switch v-model="isView"></md-switch>
      </md-field-item>
      <md-input-item
        v-model="maxlength"
        title="验证码长度"
        type="tel"
      ></md-input-item>

      <md-field-item
        title="采用掩码"
        customized
        align="right"
      >
        <md-switch v-model="mask"></md-switch>
      </md-field-item>

      <md-field-item
        title="使用系统键盘"
        customized
        align="right"
      >
        <md-switch v-model="system"></md-switch>
      </md-field-item>
    </md-field>
    <MdCaptcha
      v-model:visible="show"
      :is-view="isView"
      :title="title"
      :content="content"
      :system="system"
      :mask="mask"
      :maxlength="maxlength - 0"
      @submit="submitHandler"
    />
    <Button
      v-show="!isView"
      ref="button"
      style="margin-top: 0.32rem"
      @click="clickHandler"
    >
      确定
    </Button>
  </div>
</template>
