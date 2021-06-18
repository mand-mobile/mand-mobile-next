<script lang="ts">
export default {
  name: 'InputItemDemo',
  title: '业务场景输入框',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdInputItem from 'mand-mobile/input-item'
import MdField from 'mand-mobile/field'

const val = ref('')
</script>

<template>
  <MdField>
    <MdInputItem
      v-model="val"
      title="虚拟键盘"
      type="phone"
      :is-virtual-keyboard="true"
      :maxlength="5"
      placeholder="phone xxx xxxx xxxx"
    />
    <MdInputItem
      v-model="val"
      title="手机号"
      type="phone"
      placeholder="phone xxx xxxx xxxx"
      :maxlength="13"
    />
    <MdInputItem
      v-model="val"
      title="数字"
      type="digit"
      placeholder="digit 0123456789"
      :maxlength="13"
    />
    <MdInputItem
      v-model="val"
      title="银行卡"
      type="bankCard"
      placeholder="bankCard xxxx xxxx xxxx xxxx"
      :maxlength="13"
    />
    <MdInputItem
      v-model="val"
      title="金额"
      type="money"
      placeholder="money xx, xxx.xxxx"
      :maxlength="13"
    />
    <md-input-item
      title="密码"
      type="password"
      placeholder="password *********"
    ></md-input-item>
    <md-input-item
      title="邮箱"
      type="email"
      placeholder="其他标准 html input 类型"
    ></md-input-item>
  </MdField>
</template>
