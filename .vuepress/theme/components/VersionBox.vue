<template>
  <div class="md-doc-version">
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        Hover me
      </a>
      <!-- <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu> -->
    </a-dropdown>
  </div>
</template>

<script>
import Dropdown from 'ant-design-vue/lib/dropdown'
// import Menu from 'ant-design-vue/lib/menu'

import 'ant-design-vue/lib/dropdown/style/index.css'
// import 'ant-design-vue/lib/menu/style/index.css'

export default {
  components: {
    [Dropdown.name]: Dropdown,
    // [Menu.name]: Menu,
  }
}
</script>

<style lang="stylus" scoped>

</style>