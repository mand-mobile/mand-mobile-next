<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='stylus'>
block()
  float left
  width 100%
clearfix()
  &:after
    content ""
    display table
    clear both
uni-view.content
  padding 20px
page>.content
  padding 20px
.md-example
  .md-example-section
    clearfix()
    margin-bottom 30px
    color color-text-base
    .md-example-title
      // block()
      font-size font-body-normal
      font-weight font-weight-medium
      padding 16px 24px
      text-align left
      a
        margin-right 5px
        background color-primary
        color #fff
        padding 5px 10px
        border-radius radius-normal
        font-size font-minor-large
        font-weight 300
        line-height 28px
        text-decoration none
    .md-example-describe
      block()
      margin-top 15px
      font-size font-minor-large
      font-weight 300
      color color-text-minor
    .md-example-content
      block()
      position relative
      margin-top 20px
      box-sizing border-box
      font-size 28px
</style>

<style lang="stylus">
  page
    background-color #f3f4f5
    height 100%
  // hack css checkItem遍历后, 小程序dom结构错位
  .md-check-list
    .md-cell-item-body
      height 46rpx
</style>
