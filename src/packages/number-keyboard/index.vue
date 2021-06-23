<template>
  <md-number-keyboard-container
    v-if="isView"
    :type="type"
    :disorder="disorder"
    :hide-dot="hideDot"
    :text-render="textRender"
    :ok-text="okText"
    @confirm="onConfirm"
    @delete="onDelete"
    @enter="onEnter"
    @hide="onHide"
  ></md-number-keyboard-container>

  <md-popup
    v-else
    ref="popup"
    v-model="popupShow"
    position="bottom"
    :has-mask="false"
  >
    <slot></slot>
    <md-number-keyboard-container
      :type="type"
      :disorder="disorder"
      :hide-dot="hideDot"
      :is-view="true"
      :text-render="textRender"
      :ok-text="okText"
      @confirm="onConfirm"
      @delete="onDelete"
      @enter="onEnter"
      @hide="onHide"
    ></md-number-keyboard-container>
  </md-popup>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { PropType, ExtractPropTypes } from 'vue'
import MdNumberKeyboardContainer from './board.vue'
import MdPopup from 'mand-mobile/popup'
import { t } from 'mand-mobile/locale'

export default defineComponent({
  name: 'MdNumberKeyboard',
  components: {
    MdNumberKeyboardContainer,
    MdPopup,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<'professional' | 'simple'>,
      default: 'professional',
    },
    isView: {
      type: Boolean,
      default: false,
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: t('md.number_keyboard.confirm'),
    },
    hideDot: {
      type: Boolean,
      default: false,
    },
    isHideConfirm: {
      type: Boolean,
      default: true,
    },
    textRender: {
      type: Function,
      default: null,
    },
  },
  emits: [
    'enter',
    'confirm',
    'hide',
    'delete',
    'update:visible',
  ],
  setup(props, { emit }) {
    const popupShow = computed({
      get: () => {
        return props.visible
      },
      set: (value) => {
        emit('update:visible', value)
      },
    })

    function onEnter(key: string | number) {
      emit('enter', key)
    }

    function onDelete() {
      emit('delete')
    }

    function onConfirm() {
      emit('confirm')
      if (props.isHideConfirm) emit('update:visible', false)
    }

    function onHide() {
      emit('update:visible', false)
    }
    return {
      popupShow,
      onConfirm,
      onDelete,
      onEnter,
      onHide,
    }
  },
})
</script>

<style lang="stylus"></style>
