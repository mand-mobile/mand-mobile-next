<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-0">
    <md-drop-menu :data="data" />
    <div class="content">正文区域</div>
  </div>
</template>

<script>
import DropMenu from '../../'

export default {
  name: 'drop-menu-demo',
  /* DELETE */
  title: '基础下拉菜单',
  titleEnUS: 'Basic drop-down menu',
  height: 250,
  /* DELETE */
  components: {
    'md-drop-menu': DropMenu,
  },
  data() {
    return {
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
<style scoped>
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
</style>

