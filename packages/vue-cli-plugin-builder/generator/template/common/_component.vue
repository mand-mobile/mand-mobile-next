<template>
	<view class="content">
    <demo type="default">Default</demo>
	</view>
</template>


<script>
import demo from '@mand-mobile/components/src/<%- dashedStyledName %>/demo/index'

export default {
  name: '<%- dashedStyledName %>-page',
  components: {
    'demo': demo
  },
  data() {
    return {
      title: '<%- camelCaseStyledName %>'
    }
  },
  onLoad() {

  },
  methods: {

  }
}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
