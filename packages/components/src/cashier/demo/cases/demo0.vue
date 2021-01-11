<template>
  <div class="md-example-child md-example-child-cashier md-example-child-cashier-0">
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
        <md-switch v-model="isCashierCaptcha" slot="right"></md-switch>
      </md-field-item>
    </md-field>
    <md-button class="cashier-btn" @click="isCashierhow = !isCashierhow">{{ isCashierhow ? '收起收银台' : '唤起收银台' }}</md-button>
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
import RollerSuccess from 'mand-mobile/lib/activity-indicator/roller-success'
import Button from 'mand-mobile/lib/button'
import RadioList from 'mand-mobile/lib/radio/list'
import Field from 'mand-mobile/lib/field'
import FieldItem from 'mand-mobile/lib/field/item'
import InputItem from 'mand-mobile/lib/input-item'
import Switch from 'mand-mobile/lib/switch'
import Cashier from 'mand-mobile/lib/cashier'
import Toast from 'mand-mobile/lib/toast'

export default {
  components: {
    'md-button': Button,
    'md-radio-list': RadioList,
    'md-field': Field,
    'md-field-item': FieldItem,
    'md-input-item': InputItem,
    'md-switch': Switch,
    'md-cashier': Cashier,
    'md-roller-success': RollerSuccess,
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
          img: 'https://pt-starimg.didistatic.com/static/starimg/img/gwPHTtoZQO1608540605054.png',
          text: '招商银行(0056)',
          value: '001',
        },
        {
          img: 'https://pt-starimg.didistatic.com/static/starimg/img/D0RCIAkpYy1608540735075.png',
          text: '支付宝支付',
          value: '002',
        },
        {
          img: 'https://pt-starimg.didistatic.com/static/starimg/img/annSEDuX6m1608542345523.png',
          text: '微信支付',
          value: '003',
        },
        {
          img: 'https://pt-starimg.didistatic.com/static/starimg/img/ukiw0ZHY9o1608542432433.png',
          text: 'QQ钱包支付',
          value: '004',
        },
        {
          img: 'https://pt-starimg.didistatic.com/static/starimg/img/tSwHIMsWxk1608542251834.png',
          text: '一网通支付',
          value: '005',
        },
      ],
    }
  },
  methods: {
    doPay(isCaptchaComplete = false) {
      const cashier = this.$refs.cashier
      if (this.isCashierCaptcha && !isCaptchaComplete) {
        cashier.next('captcha', {
          text: '验证码已发送至156 **** 8965',
          brief: '上次发送的验证码仍然有效',
          autoCountdown: false,
          countNormalText: '发送验证码',
          countActiveText: '{$1}秒后重新发送',
          onSend: countdown => {
            this.sendCaptcha().then(() => {
              countdown()
            })
            console.log('[Mand Mobile] Send Captcha & Start countdown')
          },
          onSubmit: code => {
            this.checkCaptcha(code).then(res => {
              this.doPay(!!res)
            })
            console.log(`[Mand Mobile] Send Submit ${code}`)
          },
        })
      } else {
        this.createPay().then(() => {
          cashier.next(this.cashierResult, {
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
.md-example-child-cashier .cashier-btn {
  display: block;
  margin-top: 30px;
}
</style>
