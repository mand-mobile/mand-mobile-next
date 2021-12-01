<script lang="ts">
export default {
  name: 'SwiperDrawerDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdCellItem from 'mand-mobile-next/cell-item'
import MdField from 'mand-mobile-next/field'
import MdSwiperDrawer from 'mand-mobile-next/swiper-drawer'

const deleteHandler = () => {
  console.log('delete')
}
</script>

<template>
  <md-field style="overflow: hidden; padding: 0">
    <md-swiper-drawer @delete="deleteHandler">
      <md-cell-item
        title="交通银行(尾号3089)"
        brief="展示摘要描述"
        addon="附加文案"
        arrow
      />
    </md-swiper-drawer>
    <md-swiper-drawer>
      <md-cell-item
        title="交通银行"
        brief="展示摘要描述"
        addon="附加文案"
        arrow
      >
        <template #left>
          <span class="holder">
            <img
              src="https://img.ixintu.com/download/jpg/20201130/91f0ebf3c5ea90ae3d0810f9d9de24df_512_512.jpg!con"
            />
          </span>
        </template>
      </md-cell-item>
    </md-swiper-drawer>
  </md-field>
</template>

<style>
.holder {
  display: flex;
  width: 32px;
  height: 32px;
}

.holder img {
  display: block;
  width: 32px;
  height: 32px;
}
</style>
