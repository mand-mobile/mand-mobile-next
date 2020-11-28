<template>
  <div class="md-example-child md-example-child-cashier">
    <md-field
      title="支付结果"
    >
      <md-radio-list
        v-model="cashierResult"
        :options="cashierResults"
      />
    </md-field>
    <md-field
      title="支付配置"
    >
      <md-input-item
        title="支付金额"
        align="right"
        type="money"
        v-model="cashierAmount"
      >
      </md-input-item>
      <md-field-item
        title="发送验证码"
        align="right"
      >
        <md-switch v-model="isCashierCaptcha"></md-switch>
      </md-field-item>
    </md-field>
    <md-button @click="isCashierhow = !isCashierhow">{{ isCashierhow ? '收起收银台' : '唤起收银台' }}</md-button>
    <md-cashier
      ref="cashier"
      v-model="isCashierhow"
      :channels="cashierChannels"
      :channel-limit="2"
      :payment-amount="cashierAmount"
      payment-describe="关于支付金额的特殊说明"
      large-radius
      @select="onCashierSelect"
      @pay="onCashierPay"
      @cancel="onCashierCancel"
    ></md-cashier>
	</div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import RadioList from 'mand-mobile/lib/radio/list'
import Field from 'mand-mobile/lib/field'
import FieldItem from 'mand-mobile/lib/field/item'
import InputItem from 'mand-mobile/lib/input-item'
import Switch from 'mand-mobile/lib/switch'
import Cashier from 'mand-mobile/lib/cashier'
import Toast from 'mand-mobile/lib/toast'

export default {
  name: 'cashier-demo',
  /* DELETE */
  height: 700,
  /* DELETE */
  components: {
    'md-button': Button,
    'md-radio-list': RadioList,
    'md-field': Field,
    'md-field-item': FieldItem,
    'md-input-item': InputItem,
    'md-switch': Switch,
    'md-cashier': Cashier,
  },
  data() {
    return {
      isCashierhow: false,
      isCashierCaptcha: false,
      cashierAmount: '100.00',
      cashierResult: 'success',
      cashierResults: [
        {
          text: '支付成功',
          value: 'success',
        },
        {
          text: '支付失败',
          value: 'fail',
        },
      ],
      cashierChannels: [
        {
          icon: 'cashier-icon-1',
          text: '招商银行(0056)',
          value: '001',
        },
        {
          icon: 'cashier-icon-2',
          text: '支付宝支付',
          value: '002',
        },
        {
          icon: 'cashier-icon-3',
          text: '微信支付',
          value: '003',
        },
        {
          icon: 'cashier-icon-4',
          text: 'QQ钱包支付',
          value: '004',
        },
        {
          icon: 'cashier-icon-5',
          text: '一网通支付',
          value: '005',
        },
      ],
    }
  },
  methods: {
    doPay() {
      if (this.isCashierCaptcha) {
        this.$refs.cashier.next('captcha', {
          text: 'Verification code sent to 156 **** 8965',
          brief: 'The latest verification code is still valid',
          autoCountdown: false,
          countNormalText: 'Send Verification code',
          countActiveText: 'Retransmission after {$1}s',
          onSend: countdown => {
            console.log('[Mand Mobile] Send Captcha')
            this.sendCaptcha().then(() => {
              countdown()
            })
          },
          onSubmit: code => {
            console.log(`[Mand Mobile] Send Submit ${code}`)
            this.checkCaptcha(code).then(res => {
              if (res) {
                this.createPay().then(() => {
                  this.$refs.cashier.next(this.cashierResult)
                })
              }
            })
          },
        })
      } else {
        this.createPay().then(() => {
          this.$refs.cashier.next(this.cashierResult, {
            buttonText: '好的',
            handler: () => {
              this.isCashierhow = false
              Toast.info(`${this.cashierResult}点击`)
            },
          })
        })
      }
    },
    // Create a pay request & check pay result
    createPay() {
      this.$refs.cashier.next('loading')
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    // Create a captcha sending request
    sendCaptcha() {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 200)
      })
    },
    // Create a captcha checking request
    checkCaptcha(code) {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve(!!code)
        }, 200)
      })
    },
    onCashierSelect(item) {
      console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
    },
    onCashierPay(item) {
      console.log(`[Mand Mobile] Pay ${JSON.stringify(item)}`)
      this.doPay()
    },
    onCashierCancel() {
      // Abort pay request or checking request
      this.timer && clearTimeout(this.timer)
    },
  },
}

</script>

<style>
.md-example-child-cashier .md-field {
  margin-bottom: 30px;
}
</style>
