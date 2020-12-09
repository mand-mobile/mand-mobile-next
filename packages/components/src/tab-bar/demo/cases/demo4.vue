<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-4">
    <md-tab-bar
      v-model="current"
      :items="items"
      :has-ink="false"
    >
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon"/>
          </div>
          <div class="text">
            <p v-text="item.label"></p>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>

<script>
import TabBar from 'mand-mobile/lib/tab-bar'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-tab-bar': TabBar,
    'md-icon': Icon,
  },
  data() {
    return {
      current: 1,
      items: [{name: 1, label: '首页', icon: 'home'}, {name: 2, label: '我的', icon: 'user'}],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '自定义内容',
  },
  'en-US': {
    title: 'Custom item content',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-tab-bar-4 .custom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
}

.md-example-child-tab-bar-4 .custom-item .text {
  font-size: 20px;
}
</style>

