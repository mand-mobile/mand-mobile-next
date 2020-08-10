<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-3">
    <md-drop-menu :data="data">
      <template v-slot:option="{ option }">
        <div class="md-drop-menu-custom-title">{{option.text}}</div>
        <div class="md-drop-menu-custom-brief">{{ option.text }}【可使用slot-scope进行自定义描述】</div>
      </template>
    </md-drop-menu>
    <div class="content">正文区域</div>
  </div>
</template>

<script>
import DropMenu from 'mand-mobile/lib/drop-menu'

export default {
  name: 'drop-menu-demo',
  /* DELETE */
  title: '自定义菜单项',
  titleEnUS: 'Custom menu options',
  height: 250,
  /* DELETE */
  components: {
    'md-drop-menu': DropMenu,
  },
  data() {
    return {
      isContentShow: false,
      data: [
        {
          text: '一级选项1',
          options: [
            {
              value: '0',
              text: '二级选项1',
            },
            {
              value: '1',
              text: '二级选项2',
            },
          ],
        },
      ],
    }
  },
}

</script>

<style>
.md-example-child-drop-menu {
  position: relative;
  height: 400px;
  background: #F9FAFB;
  overflow: hidden;
}
      
.md-example-child-drop-menu .md-drop-menu {
  position: absolute;
  float: left;
  width: 100%;
  height: 100%;
}

.md-example-child-drop-menu .md-drop-menu .md-drop-menu_bar {
  height: 110px;
}

.md-example-child-drop-menu .md-popup {
  position: absolute;
}
      
.md-example-child-drop-menu .content {
  font-size: 26px;
  text-align: center;
  line-height: 400px;
}    

.md-example-child-drop-menu-3 .md-drop-menu-custom-title {
  font-size: 28px;
  text-align: center;
}
    
.md-example-child-drop-menu-3 .md-drop-menu-custom-brief {
  font-size: 20px;
  color: #999;
  text-align: center;
}
</style>
