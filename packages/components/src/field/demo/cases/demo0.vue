<template>
  <div class="md-example-child md-example-child-field md-example-child-field-0">
    <md-field title="区域标题" brief="区域描述性文本，可根据具体场景配置">
      <div class="action-container" slot="action" @click="onClick">
        操作 <md-icon name="rectangle"></md-icon>
      </div>
      <p slot="footer">区域页脚区域内容插槽</p>
      <md-field-item solid title="标题区域" placeholder="提示文本" />
      <md-field-item solid title="标题区域" content="内容文本" addon="次要信息" />
      <md-field-item solid title="附加内容" content="正文内容" :customContentClass="arr">
        <p slot="children">这是子内容区域</p>
      </md-field-item>
      <md-field-item solid title="动作条目" arrow @click="onClick" />
      <md-field-item solid title="禁用条目" content="内容禁用状态" arrow disabled />
    </md-field>

    <md-dialog
      :closable="false"
      v-model="asyncDialog.open"
      :btns="asyncDialog.btns"
    >
      <div class="text">点击了</div>
    </md-dialog>
  </div>
</template>

<script>
import Dialog from 'mand-mobile/lib/dialog/dialog'
import Field from 'mand-mobile/lib/field'
import FieldItem from 'mand-mobile/lib/field/item'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-field': Field,
    'md-field-item': FieldItem,
    'md-icon': Icon,
    'md-dialog': Dialog,
  },

  data() {
    return {
      open: false,
      arr: ['arr-name'],
      asyncDialog: {
        open: false,
        btns: [
          {
            text: '确定',
          },
        ],
      },
    }
  },

  methods: {
    onClick() {
      this.asyncDialog.open = true
    },
  },
}

</script>

<style scoped>
.md-example-child-field-0 {
  text-align: left;
}
  
.md-field-action {
  height: 36px;
  align-items: flex-end;
}
    
.action-container {
  display: flex;
  align-items: center;
}
  
.md-icon {
  margin-left: 10px;
  color: #C5CAD5;
  font-size: 16px;
  width: auto;
  height: auto;
  line-height: normal;
}

.text {
  font-size: 24px;
  text-align: center;
}
</style>

