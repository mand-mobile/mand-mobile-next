<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-2">
    <md-drop-menu :data="data" :default-value="['1', '8']" />
    <div class="content">正文区域</div>
  </div>
</template>

<script>
import DropMenu from 'mand-mobile/lib/drop-menu'

export default {
  components: {
    'md-drop-menu': DropMenu,
  },
  data() {
    return {
      isContentShow: false,
      data: [
        {
          text: '排量',
          options: [
            {
              value: '0',
              text: '1.6L',
            },
            {
              value: '1',
              text: '1.8L',
            },
            {
              value: '2',
              text: '2.0L',
              disabled: true,
            },
            {
              value: '3',
              text: '1.2T',
            },
            {
              value: '4',
              text: '1.4T',
            },
            {
              value: '5',
              text: '1.6T',
            },
          ],
        },
        {
          text: '变速箱',
          disabled: true,
          options: [
            {
              value: '7',
              text: '手动挡',
            },
            {
              value: '8',
              text: '自动挡',
            },
            {
              value: '9',
              text: '手自一体',
            },
          ],
        },
      ],
    }
  },
}
// #region ignore
export const metaInfo = {
  height: 500,
  'zh-CN': {
    title: '禁用下拉菜单',
  },
  'en-US': {
    title: 'Drop-down menu with disabled item',
  },
}
// #endregion ignore

</script>
<style>
.md-example-child-drop-menu-2 {
  position: relative;
  height: 400px;
  background: #F9FAFB;
  overflow: hidden;
}
      
.md-example-child-drop-menu-2 .md-drop-menu {
  position: absolute;
  float: left;
  width: 100%;
  height: 100%;
}

.md-example-child-drop-menu-2 .md-drop-menu .md-drop-menu_bar {
  height: 110px;
}

.md-example-child-drop-menu-2 .md-popup {
  position: absolute;
}
      
.md-example-child-drop-menu-2 .content {
  font-size: 26px;
  text-align: center;
  line-height: 400px;
}    
</style>