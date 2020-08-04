<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-0">
    <md-picker-view
      ref="picker"
      :data="pickerData"
      :default-index="[1]"
      :invalid-index="[[2, 3, 4]]"
      is-vibrate
      @initialed="onPickerInitialed"
      @change="onPickerConfirm"
    ></md-picker-view>
  </div>
</template>

<script>
import PickerView from 'mand-mobile/lib/picker/picker-view'
import simple from 'mand-mobile/lib/picker/demo/data/simple'

export default {
  name: 'picker-demo',
  components: {
    'md-picker-view': PickerView,
  },
  data() {
    return {
      pickerData: simple,
      pickerDataNew: [
        {
          text: 'Hello World',
          value: 9999,
        },
      ],
      pickerValue: '',
    }
  },
  mounted() {
    // window.PickerTrigger0 = () => {
    //   this.getColumnValues('picker')
    // }
    // window.PickerTrigger1 = () => {
    //   this.getColumnIndexs('picker')
    // }
    // window.PickerTrigger2 = () => {
    //   this.setColumnValues('picker')
    // }
  },
  methods: {
    onPickerInitialed() {
      const value = this.$refs.picker.getColumnValues()
      console.log(`[Mand Mobile] Picker Initialed: ${JSON.stringify(value)}`)
    },
    onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text
      }
    },
    getColumnValues(picker) {
      const value = this.$refs[picker].getColumnValues()
      console.log(`[Mand Mobile]: ${JSON.stringify(value)}`)
      // Dialog.alert({
      //   content: `<pre>${JSON.stringify(value)}</pre>`,
      // })
    },
    getColumnIndexs(picker) {
      const value = this.$refs[picker].getColumnIndexs()
      console.log(`[Mand Mobile]: ${JSON.stringify(value)}`)
      // Dialog.alert({
      //   content: `<pre>${JSON.stringify(value)}</pre>`,
      // })
    },
    setColumnValues(picker) {
      this.$refs[picker].setColumnValues(0, this.pickerDataNew, vm => {
        vm.refresh(null, 0)
      })
    },
  },
}

</script>
