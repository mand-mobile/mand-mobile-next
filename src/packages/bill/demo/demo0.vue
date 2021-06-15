<script lang="ts">
import '../../../assets/images/bank-zs.svg'

export default {
  name: 'BillDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import MdDetailItem from 'mand-mobile/detail-item'
import MdIcon from 'mand-mobile/icon'
import MdBill from 'mand-mobile/bill'
import MdTag from 'mand-mobile/tag'
</script>

<template>
  <div class="md-example-child md-example-child-bill-1">
    <md-bill
      title="借款电子票据"
      no="12345689"
      water-mark="MAND-MOBILE"
    >
      <md-detail-item title="借款金额">
        &yen;30,000
      </md-detail-item>
      <md-detail-item title="收款账户">
        <md-icon
          name="bank-zs"
          svg
          style="margin-right: 10px"
        ></md-icon
        >招商银行(尾号xxxx)
      </md-detail-item>
      <md-detail-item title="借款期数" content="12期" />
      <md-detail-item title="正常还款总息">
        &yen;140.50
      </md-detail-item>
      <md-detail-item title="还款">
        <md-tag
          size="small"
          shape="fillet"
          type="fill"
          fill-color="#858B9C"
          style="margin-right: 4px"
          >首次</md-tag
        >
        &yen;404.50&nbsp;(9月22日)
      </md-detail-item>
    </md-bill>
  </div>
</template>
