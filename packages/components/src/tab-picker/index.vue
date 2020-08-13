<template>
  <div class="md-tab-picker">
    <md-popup
      :value="value"
      position="bottom"
      :mask-closable="maskClosable"
      @input="$_onPopupInput"
      @show="$_onPopupShow"
      @hide="$_onPopupHide"
      @maskClick="$_onCancel"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        only-close
        @cancel="$_onCancel"
      >
        <md-icon name="close" size="lg" slot="cancel" />
      </md-popup-title-bar>
      <div class="md-tab-picker_content">
        <md-tabs
          ref="tabs"
          v-model="currentTab"
          :key="tabsTmpKey"
          :ink-length="100"
          :tab-bar="{
            justify: 'flex-start',
            inkLength: 100,
            innerBorder: true
          }"
        >
          <div class="md-tab-picker_pane-wrapper">
            <md-scroll-view
              ref="scrollView"
              :scrolling-x="false"
              :styles="{height: '250px'}"
              auto-reflow
            >
              <md-tab-pane
                v-for="(pane, index) in panes"
                :key="pane.name"
                :name="pane.name"
                :label="pane.label"
              >
                <div class="md-tab-picker_pane" @touchstart="$_onActivePane(index)">
                  <md-radio-list
                    :value="pane.value"
                    :options="pane.options"
                    :is-slot-scope="hasSlot"
                    is-title-active
                    @input="$_onSelectPaneItem($event, index)"
                    icon=""
                    icon-inverse=""
                    icon-position="right"
                  >
                    <template slot-scope="{ option }">
                      <slot :option="option"></slot>
                    </template>
                  </md-radio-list>
                </div>
              </md-tab-pane>
            </md-scroll-view>
          </div>
        </md-tabs>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {extend} from '@mand-mobile/shared/lib/util'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import Icon from '../icon'
import Tabs from '../tabs'
import TabPane from '../tabs/tab-pane'
import RadioList from '../radio/list'
import ScrollView from '../scroll-view'

export default {
  name: 'md-tab-picker',

  mixins: [popupMixin, popupTitleBarMixin],

  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitlebar,
    'md-icon': Icon,
    'md-tabs': Tabs,
    'md-tab-pane': TabPane,
    'md-radio-list': RadioList,
    'md-scroll-view': ScrollView,
  },

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // title: {
    //   type: String,
    //   default: '',
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
  },

  data() {
    return {
      selected: [],
      oldSelected: [],
      currentTab: '',
      oldCurrentTab: '',
      tabsTmpKey: Date.now(),
      isInitialed: false,
    }
  },

  computed: {
    panes() {
      const panes = []
      let target = this.data
      let cursor = 0
      while (target && target.name) {
        const pane = {
          name: target.name,
          label: target.label || this.placeholder,
          value: this.selected[cursor],
          selected: null,
          options: target.options,
        }
        let find = false
        for (let i = 0, len = target.options.length; i < len; i++) {
          if (target.options[i].value === this.selected[cursor]) {
            pane.label = target.options[i].label
            pane.selected = target.options[i]
            target = target.options[i].children
            find = true
            cursor++
            break
          }
        }
        if (!find) {
          target = null
        }
        panes.push(pane)

        if (!this.isInitialed) {
          this.currentTab = pane.name
          this.isInitialed = true
        }
      }

      return panes
    },
    hasSlot() {
      return !!this.$scopedSlots.default
    },
  },

  created() {
    /* istanbul ignore else */
    if (this.defaultValue) {
      this.selected = this.defaultValue
    }

    /* istanbul ignore else */
    if (this.data) {
      this.currentTab = this.data.name
    }
  },

  methods: {
    // MARK: private events
    $_onPopupInput(val) {
      this.$emit('input', val)
    },
    $_onPopupShow() {
      this.$refs.tabs.reflowTabBar()
      this.$emit('show')
      setTimeout(() => {
        this.oldSelected = extend([], this.selected)
        this.oldCurrentTab = this.currentTab
      }, 100)
    },
    $_onPopupHide() {
      this.$emit('hide')
    },
    $_onCancel() {
      this.hideTabPicker()
      setTimeout(() => {
        this.selected = extend([], this.oldSelected)
        this.currentTab = this.oldCurrentTab
        this.tabsTmpKey = Date.now()
      }, 100)
    },
    $_onSelectPaneItem(value, index) {
      if (this.activePaneIndex !== index) {
        return
      }

      this.selected.splice(index, this.selected.length - index, value)
      this.$nextTick(() => {
        const nextPane = this.panes[index + 1]

        this.$emit('select', {
          index,
          value,
          option: this.panes[index],
        })

        /* istanbul ignore else */
        if (nextPane) {
          this.currentTab = nextPane.name
          this.$refs.scrollView.scrollTo(0, 0)
        } else if (value !== '') {
          setTimeout(() => {
            this.$emit('change', {
              values: this.getSelectedValues(),
              options: this.getSelectedOptions(),
            })
            this.hideTabPicker()
          }, 300)
        }
      })
    },
    $_onActivePane(index) {
      this.activePaneIndex = index
    },
    // MARK: public methods
    getSelectedValues() {
      return this.selected
    },
    getSelectedOptions() {
      if (this.panes && this.panes.length) {
        return this.panes.filter(pane => pane.value).map(pane => pane.selected)
      } else {
        return []
      }
    },
    hideTabPicker() {
      this.$emit('input', false)
    },
  },
}

</script>

<style lang="stylus">
.md-tab-picker
  .md-popup
    z-index md-tab-picker-zindex
  /deep/.md-tab-bar
    position relative
    margin-left md-tab-picker-h-gap
    margin-right md-tab-picker-h-gap
    padding-left 0
    padding-right 0
    background-color md-tab-picker-bg
    hairline(bottom, md-color-border-base)
  /deep/.md-popup-cancel
    width 90px !important
.md-tab-picker_content
  background-color md-tab-picker-bg
.md-tab-picker_pane-wrapper
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  // border-top solid 1px color-border-base
.md-tab-picker_pane
  padding-left md-tab-picker-h-gap
  padding-right md-tab-picker-h-gap
  box-sizing border-box
</style>
