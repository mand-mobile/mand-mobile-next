<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
    <view class="demo-wrapper">
      <md-bt type="default">Default</md-bt>
    </view>
    <icon-demo></icon-demo>
	</view>
</template>


<script>
import Button from 'mand-mobile/lib/button'
import Icon from 'mand-mobile/lib/icon'
// import CheckBox from 'mand-mobile';

export default {
  name: 'hi',
  components: {
    'md-bt': Button,
    'icon-demo': Icon,
  },
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {},
}

</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
    padding: 0 32px;
	}
  .demo-wrapper {
    margin-bottom: 24px;
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
