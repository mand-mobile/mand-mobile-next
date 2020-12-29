<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-8">
    <md-steps
      direction="vertical"
      :steps="steps"
      :current="0.5"
    >
      <template #reached>
        <md-icon name="checked"></md-icon>
      </template>
      <template #content="{index, step}">
        <div class="custom-content">
          <template v-if="index === 0">
            <p class="name active" v-text="step.name"></p>
            <p class="amount">
              <md-amount class="md-amount" :value="step.amount"/>元
            </p>
            <p class="desc" v-html="step.text"></p>
          </template>
          <template v-else>
            <p class="name" v-text="step.name"></p>
          </template>
        </div>
      </template>
    </md-steps>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'
import Amount from 'mand-mobile/lib/amount'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-steps': Steps,
    'md-amount': Amount,
    'md-icon': Icon,
  },
  data() {
    return {
      steps: [
        {
          name: '还款申请已提交',
          amount: 600.5,
          text: '银行处理中，预计30分钟内到账，请留意短信信息。如有疑问，请联系客服。',
        },
        {
          name: '还款成功',
        },
      ],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '自定义内容',
  },
  'en-US': {
    title: 'Custom content',
  },
}
// #endregion ignore

</script>

<style scoped>
.custom-content {
  margin-bottom: 20px;
}
.custom-content .name {
  font-size: 28px;
  color: #858B9C
}
.custom-content .name.active {
  /* font-size: 40px; */
  color: #111A34;
}
.custom-content .amount {
  margin-top: 20px;
  color: #111A34;
}
.custom-content .amount .md-amount {
  margin-right: 5px;
  font-size: 60px;
}
.custom-content .desc {
  line-height: 40px !important;
  font-size: 26px;
  color: #858b9c;
}
.custom-content .desc /deep/span {
  color: #FF8325;
}
</style>

