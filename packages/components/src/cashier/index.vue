<template>
  <div class="md-cashier">
    <md-popup
      v-model="isCashierShow"
      position="bottom"
      :mask-closable="false"
      prevent-scroll-exclude=".choose-channel"
      prevent-scroll
      @show="$_onPopupShow"
      @hide="$_onPopupHide"
    >
      <div class="md-cashier_popup">
        <md-popup-title-bar
          :title="title"
          :describe="describe"
          only-close
          @cancel="$_onPopupCancel"
        ></md-popup-title-bar>
        <div class="md-cashier_container">
          <slot name="header" :scene="scene"></slot>

          <!-- Choose pay channel -->
          <div
            v-if="scene === 'choose'"
            class="md-cashier_container_block"
            :key="sceneKey"
          >
            <md-cashier-channel
              ref="channel"
              :payment-title="paymentTitle"
              :payment-amount="paymentAmount"
              :payment-describe="paymentDescribe"
              :more-button-text="moreButtonText"
              :pay-button-text="payButtonText"
              :pay-button-disabled="payButtonDisabled"
              :channels="channelsAggregated"
              :channelLimit="channelLimit"
              :default-index="defaultIndex"
              @action="$_onActionsHandler"
              @select="$_cashierChannelEventHandler('select', $event)"
              @pay="$_cashierChannelEventHandler('pay', $event)"
            >
              <slot name="channel"></slot>
              <template #button>
                <slot name="payButton">{{ payButtonText }}</slot>
              </template>
            </md-cashier-channel>
          </div>

          <!-- Captcha -->
          <div
            v-else-if="scene === 'captcha'"
            class="md-cashier_container_block md-cashier-captcha"
            :key="sceneKey"
          >
            <md-captcha
              ref="captcha"
              class="md-cashier_captcha_inner"
              :maxlength="sceneOption.captcha.maxlength"
              :count="sceneOption.captcha.count"
              :countNormalText="sceneOption.captcha.countNormalText"
              :countActiveText="sceneOption.captcha.countActiveText"
              :auto-countdown="sceneOption.captcha.autoCountdown"
              :brief="sceneOption.captcha.brief"
              is-view
              @send="$_onCaptchaHandler('onSend', $event)"
              @submit="$_onCaptchaHandler('onSubmit', $event)"
            >
              <div v-text="sceneOption.captcha.text"></div>
            </md-captcha>
          </div>

          <!-- Loaing, Success -->
          <div
            v-else-if="scene === 'loading' || scene === 'success'"
            class="md-cashier_container_block"
            :class="{
              'md-cashier-loading': scene === 'loading',
              'md-cashier-success': scene === 'success'
            }"
            :key="sceneKey"
          >
            <div class="md-cashier_container_block_icon">
              <md-roller-success
                class="md-roller-success"
                ref="rolling"
                :is-success="scene === 'success'"
                :key="sceneKey"
              ></md-roller-success>
            </div>
            <div class="md-cashier_container_block_text">{{ scene === 'success' ? sceneOption.success.text : sceneOption.loading.text }}</div>
            <md-cashier-channel-button
              v-if="scene === 'success'"
              :actions="sceneOption.success.actions"
              @action="$_onActionsHandler"
            />
          </div>

          <!-- Fail -->
          <div
            v-else-if="scene === 'fail'"
            class="md-cashier_container_block md-cashier-fail"
            :key="sceneKey">
            <div class="md-cashier_container_block_icon">
              <md-icon class="md-icon" name="warn-color"></md-icon>
            </div>
            <div class="md-cashier_container_block_text" v-text="sceneOption.fail.text"></div>
            <md-cashier-channel-button
              :actions="sceneOption.fail.actions"
              @action="$_onActionsHandler"
            />
          </div>

          <!-- Custom -->
          <div
            v-else-if="scene === 'custom'"
            class="md-cashier_container_block md-cashier-custom"
            :key="sceneKey"
          >
            <slot name="scene"/>
          </div>

          <slot name="footer" :scene="scene"></slot>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {noop, extend} from '@mand-mobile/shared/lib/util'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import Captcha from '../captcha'
import Icon from '../icon'
import RollerSuccess from '../activity-indicator/roller-success'
import Channel from './channel'
import ChannelButton from './channel-button'

export default {
  name: 'md-cashier',

  mixins: [popupMixin, popupTitleBarMixin],

  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitlebar,
    'md-captcha': Captcha,
    'md-icon': Icon,
    'md-roller-success': RollerSuccess,
    'md-cashier-channel': Channel,
    'md-cashier-channel-button': ChannelButton,
  },

  props: {
    channels: {
      type: Array,
      default() {
        return []
      },
    },
    channelLimit: {
      type: Number,
      default: 2,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    paymentTitle: {
      type: String,
      default: '\u652f\u4ed8\u91d1\u989d\u0028\u5143\u0029', // 支付金额
    },
    paymentAmount: {
      type: String,
      default: '0.00',
    },
    paymentDescribe: {
      type: String,
      default: '',
    },
    payButtonText: {
      type: String,
      default: '\u786e\u5b9a\u652f\u4ed8', // 确定支付
    },
    payButtonDisabled: {
      type: Boolean,
      default: false,
    },
    moreButtonText: {
      type: String,
      default: '\u66f4\u591a\u652f\u4ed8\u65b9\u5f0f', // 更多支付方式
    },
    title: {
      default: '\u652f\u4ed8', // 支付
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
  },

  data() {
    return {
      isCashierShow: false,
      scene: 'choose', // choose, captcha, loading, success, fail
      sceneKey: Date.now(),
      sceneOption: {
        loading: {
          text: '\u652f\u4ed8\u7ed3\u679c\u67e5\u8be2\u4e2d\u002e\u002e\u002e', // 支付结果查询中...
        },
        success: {
          text: '\u652f\u4ed8\u6210\u529f', // 支付成功
          buttonText: '\u6211\u77e5\u9053\u4e86', // 我知道了
          handler: () => {
            this.isCashierShow = false
          },
        },
        fail: {
          text: '\u652f\u4ed8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5', // 支付失败，请稍后重试
          buttonText: '\u6211\u77e5\u9053\u4e86', // 我知道了
          handler: () => {
            this.isCashierShow = false
          },
        },
        captcha: {
          text: '',
          brief: '',
          maxlength: 4,
          count: 60,
          autoCountdown: true,
          onSend: noop,
          onSubmit: noop,
        },
      },
      channelsTmp: [],
    }
  },

  computed: {
    channelsAggregated() {
      return [...this.channels, ...this.channelsTmp]
    },
  },

  watch: {
    value(val) {
      this.isCashierShow = val
    },
    isCashierShow(val) {
      this.$emit('input', val)
    },
  },

  created() {
    this.$_initialCashier()

    if (this.channelsAggregated.length < 3) {
      this.isChannelShow = true
      this.isChannelActive = true
    }
  },

  methods: {
    // MARK: private methods
    $_initialCashier() {
      this.isCashierShow = this.value
    },
    $_resetCashier() {
      this.scene = 'choose'
      this.isChannelShow = false
      this.isChannelActive = false
    },
    $_bindActionHandler(scene, actions) {
      if (!actions) {
        return
      }
      return actions.map((action, index) => {
        action.scene = scene
        action.index = index
        return action
      })
    },
    // MARK: events handler, 如 $_onButtonClick
    $_onPopupShow() {
      this.$emit('show')
    },
    $_onPopupHide() {
      this.$_resetCashier()
      this.$emit('hide')
    },
    $_onPopupCancel() {
      this.isCashierShow = false
      this.$emit('cancel')
    },
    $_onCaptchaHandler() {
      const [handlerName, ...args] = arguments
      this.sceneOption.captcha[handlerName].apply(this, args)
    },
    $_onActionsHandler(action) {
      const sceneOption = this.sceneOption[action.scene]
      const actions = sceneOption.actions
      const handler = action.handler || actions[action.index].handler
      handler.call(this)
    },
    $_cashierChannelEventHandler(evt, payload) {
      this.$emit(evt, payload)
    },
    // MARK: public methods
    setChannels(channels) {
      this.channelsTmp = channels

      // 小程序不支持透传function hanlder，通过代理记录handler位置
      const scene = 'channelItem'
      this.sceneOption[scene] = this.sceneOption[scene] || {}
      this.sceneOption[scene].actions = this.$_bindActionHandler(
        scene,
        channels.map(channel => {
          return channel.action
        }),
      )
    },
    next(scene, option = {}) {
      if (this.sceneOption[scene]) {
        extend(this.sceneOption[scene], option)

        const sceneOption = this.sceneOption[scene]
        if (sceneOption && sceneOption.handler && !sceneOption.actions) {
          sceneOption.actions = [
            {
              buttonText: sceneOption.buttonText,
              handler: sceneOption.handler,
            },
          ]
        }

        // 小程序不支持透传function hanlder，通过代理记录handler位置
        sceneOption.actions = this.$_bindActionHandler(scene, sceneOption.actions)
      }
      this.scene = scene
      this.sceneKey = Date.now()
    },
  },
}

</script>

<style lang="stylus">
.md-cashier
  &_container
    block()
    position relative
    background md-cashier-bg
    -webkit-touch-callout none
    -webkit-user-select none
    top -2px
    overflow hidden
    &_block
      clearfix()
      &_icon
        position relative
        left 50%
        float left
        width 100px
        height 100px
        margin-top 75px
        transform translateX(-50%)
        .md-roller-success
          display block
          width 100%
          height 100%
        .md-activity-indicator_svg
          width 100px !important
          height 100px !important
      &_text
        block()
        margin-top 20px
        margin-bottom 180px
        font-size md-font-minor-large
        color md-color-text-minor
        text-align center
        
      &.md-cashier-captcha
        .md-cashier_captcha_inner
          display block
          margin-top 44px
          color md-color-text-caption

      &.md-cashier-fail
        .md-cashier_container_block_icon
          position relative
          text-align center
          line-height 100px
          .md-icon
            position relative
            z-index 2
            color #FFF6F1
            width 100px
            height 100px
</style>
