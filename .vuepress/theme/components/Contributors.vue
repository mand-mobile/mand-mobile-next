<template>
  <div class="md-doc-contributors">

  </div>
</template> 

<script>
export default {
  props: {
    owner: {
      default: 'mand-mobile'
    },
    repo: {
      default: 'mand-mobile-next'
    },
    fileName: {
      default: '/packages/components/src/button/README.md'
    }
  },
  mounted () {
    this.getAvatarList(this.$props)
    .then(data => {
      console.log(data)
    })
  },
  methods: {
    async getAvatarList ({
      fileName,
      repo,
      owner,
    }) {
      const url = `https://proapi.azurewebsites.net/doc/getAvatarList?filename=${fileName}&owner=${owner}&repo=${repo}`
      const data = await fetch(url, { mode: 'cors' })
        .then(res => res.json())
        .catch(e => console.log(e))
      if (!data) {
        return []
      }
      return data
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>