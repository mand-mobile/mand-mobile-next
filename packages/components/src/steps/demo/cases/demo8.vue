<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-8">
    <md-steps
      direction="vertical"
      :steps="steps0"
      :current="0.5"
    >
      <template slot="reached">
        <md-icon name="checked"></md-icon>
      </template>
      <div class="custom-content" slot="content"></div>
    </md-steps>
    <md-steps
      direction="vertical"
      :steps="steps1"
      :current="1"
    >
      <template slot="current">
        <md-icon name="checked"></md-icon>
      </template>
      <div
        class="custom-content"
        slot="content"
        slot-scope="{ index, step }"
      >
        <template v-if="index === 1">
          <p class="name active" v-text="step.name"></p>
          <p class="amount">
            <!-- <md-amount :value="+step.amount"></md-amount>元 -->
          </p>
        </template>
        <template v-else>
          <p class="name" v-text="step.name"></p>
        </template>
      </div>
    </md-steps>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'
// import Amount from '../../../amount'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-steps': Steps,
    // 'md-amount': Amount,
    'md-icon': Icon,
  },
  data() {
    return {
      steps0: [
        {
          name: '还款申请已提交',
          amount: '600.5',
          text: '银行处理中，预计<span>30分钟</span>内到账，请留意短信信息。如有疑问，请联系客服。',
        },
        {
          name: '还款成功',
        },
      ],
      steps1: [
        {
          name: '还款申请已提交',
        },
        {
          name: '还款成功',
          amount: '600.5',
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

<style>
.md-example-child-steps-8 .custom-content .name {
  font-size: 28px;
  color: #858B9C
}
.md-example-child-steps-8 .custom-content .name.active {
  font-size: 40px;
  color: #111A34;
}
.md-example-child-steps-8 .custom-content .amount {
  margin-top: 20px;
  color: #111A34;
}
.md-example-child-steps-8 .custom-content .amount .md-amount {
  margin-right: 5px;
  font-size: 80px;
}
.md-example-child-steps-8 .custom-content .desc {
  line-height: 40px !important;
}
.md-example-child-steps-8 .custom-content .desc span {
  color: #FF8325;
}
</style>

