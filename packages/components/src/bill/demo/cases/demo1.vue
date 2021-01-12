<template>
  <div class="md-example-child md-example-child-bill-1">
    <md-bill>
      <template>
        <div class="header-slot" slot="header" :style="{padding: '40rpx 0 20rpx 0'}">
          <h1 class="title" :style="{'color': '#111A34', 'font-size': '60rpx', 'font-family': 'Songti SC','line-height': 1}">借款单据</h1>
          <p class="desc" :style="{  'margin-top': '16rpx', 'color': '#858B9C', 'font-size': '26rpx'}">仔细阅读，关注您的利益、义务</p>
        </div>
      </template>
      <md-detail-item title="借款金额">
        &yen;30,000
      </md-detail-item>
      <md-detail-item title="收款账户">招商银行(尾号xxxx)</md-detail-item>
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
          style="margin-right:4px;"
        >首次</md-tag>
        &yen;404.50&nbsp;(9月22日)
      </md-detail-item>
      <div class="footer-slot" slot="footer" :style="{'padding': '32rpx 0', 'color': '#858B9C','font-size': '22rpx', 'line-height': 1.5, 'border-top': 'solid 1rpx #E1E4EB'}">
        1 账单生成后显示在滴水贷首页，请按时还款避免逾期。 <br>
        2 整笔账单还款完成后，额度将恢复。暂不支持额度实时恢复。<br>
        3 还款日将自动扣款，扣款顺序优先余额，其次还款账户：工商银行 (尾号xxxx)。
      </div>
    </md-bill>
	</div>
</template>

<script>
import Bill from 'mand-mobile/lib/bill'
import DetailItem from 'mand-mobile/lib/detail-item'
import Tag from 'mand-mobile/lib/tag'

export default {
  components: {
    'md-bill': Bill,
    'md-detail-item': DetailItem,
    'md-tag': Tag,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '使用插槽',
  },
  'en-US': {
    title: 'Using slots',
  },
}
// #endregion ignore

</script>
<style>
.md-example-child-bill-1 .md-bill {
  background-color: #FFF;
  box-shadow: 0 6px 24px rgba(17, 26, 52, .05);
}
.md-example-child-bill-1 .md-bill.md-water-mark {
  overflow: visible;
}
.md-example-child-bill-1 .md-bill .md-bill-neck:before {
  content: '';
  position: absolute;
  top: 0;
  left: -46px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #F3F4F5;
}
.md-example-child-bill-1 .md-bill .md-bill-neck:after {
  content: '';
  position: absolute;
  top: 0;
  right: -46px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #F3F4F5;
}
.md-example-child-bill-1 .md-bill .header-slot {
  padding: 40px 0 20px 0;
}
.md-example-child-bill-1 .md-bill .header-slot .title {
  color: #111A34;
  font-size: 60px;
  font-family: Songti SC;
  line-height: 1;
}
.md-example-child-bill-1 .md-bill .header-slot .desc {
  margin-top: 16px;
  color: #858B9C;
  font-size: 26px;
}
.md-example-child-bill-1 .md-bill .footer-slot {
  padding: 32px 0;
  color: #858B9C;
  font-size: 22px;
  line-height: 1.5;
  border-top: solid 1px #E1E4EB;
}
</style>