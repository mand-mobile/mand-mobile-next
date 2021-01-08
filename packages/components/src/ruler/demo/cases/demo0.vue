<template>
  <div class="md-example-child md-example-child-single-component">
    <p class="title">当前值：{{ value }}</p>
    <div class="container">
      <md-ruler
        :scope="scope"
        :step="100"
        :unit="10"
        v-model="value"
      ></md-ruler>
    </div>
	</div>
</template>

<script>
import Ruler from 'mand-mobile/lib/ruler'

export default {
  components: {
    'md-ruler': Ruler,
  },
  data() {
    return {
      value: 1000,
      scope: [1000, 2000],
    }
  },
}

</script>

<style scoped>
.md-example-child-single-component .title {
  font-size: 22px;
  color: #999;
}
.md-example-child-single-component .container {
  margin-top: 20px;
  border-radius: 6px;
  background: #FFF;
}
</style>
