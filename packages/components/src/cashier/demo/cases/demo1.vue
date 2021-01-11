<template>
  <div class="md-example-child md-example-child-cashier">
    <md-button @click="isCashierhow = !isCashierhow">{{ isCashierhow ? '收起收银台' : '唤起收银台' }}</md-button>
    <md-cashier
      ref="cashier"
      v-model="isCashierhow"
      :payment-amount="cashierAmount"
      payment-describe="关于支付金额的特殊说明"
      large-radius
      @show="onCashierShow"
      @select="onCashierSelect"
      @pay="onCashierPay"
      @cancel="onCashierCancel"
    >
      <template #header="{ scene }">
        <md-notice-bar
          v-if="scene === 'choose'"
          icon="warn"
          type="warning"
        >
          该银行3:00-12:00系统维护，请更换其他银行卡
        </md-notice-bar>
      </template>
      <template #footer="{ scene }">
        <div v-if="scene === 'choose' && !isCashierInitialed" class="cashier-loading">
          <md-activity-indicator :size="30" vertical>加载中...</md-activity-indicator>
        </div>
      </template>
      <div slot="payButton" class="pay-button">
        <md-icon name="checked"></md-icon>发起支付
      </div>
      <div slot="scene" class="custom-scene">
        Custom Scene
      </div>
    </md-cashier>
	</div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Cashier from 'mand-mobile/lib/cashier'
import Toast from 'mand-mobile/lib/toast'
import Icon from 'mand-mobile/lib/icon'
import NoticeBar from 'mand-mobile/lib/notice-bar'
import ActivityIndicator from 'mand-mobile/lib/activity-indicator'

export default {
  components: {
    'md-button': Button,
    'md-cashier': Cashier,
    'md-icon': Icon,
    'md-notice-bar': NoticeBar,
    'md-activity-indicator': ActivityIndicator,
  },
  data() {
    return {
      isCashierhow: false,
      isCashierInitialed: false,
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
          img: 'https://pt-starimg.didistatic.com/static/starimg/img/rZBbFoIJEJ1546934427562.png',
          text: 'XX银行(1234)',
          desc: '当前银行维护中',
          value: '001',
          disabled: true,
          action: {
            text: '更换',
            handler: () => {
              Toast.info('点击更换银行卡')
            },
          },
        },
      ],
    }
  },
  mounted() {
    this.$refs.cashier.setChannels(this.cashierChannels)
  },
  methods: {
    doPay() {
      if (this.isCashierCaptcha) {
        const cashier = this.$refs.cashier
        cashier.next('captcha', {
          text: 'Verification code sent to 156 **** 8965',
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
                  cashier.next(this.cashierResult)
                })
              }
            })
          },
        })
      } else {
        this.createPay().then(() => {
          const cashier = this.$refs.cashier
          cashier.next(this.cashierResult, {
            actions: [
              {
                buttonText: '返回',
                handler: () => {
                  cashier.next('choose')
                },
              },
              {
                buttonText: '重试',
                handler: () => {
                  cashier.next('custom')
                },
              },
            ],
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
    onCashierShow() {
      setTimeout(() => {
        this.isCashierInitialed = true
      }, 2000)
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
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '使用插槽及其他配置',
  },
  'en-US': {
    title: 'Using slots and other configurations',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-cashier .md-field {
  margin-bottom: 30px;
}
.md-example-child-cashier .pay-button {
  display: flex;
  align-items: center;
}
.md-example-child-cashier .custom-scene {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 32px;
}
.cashier-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
