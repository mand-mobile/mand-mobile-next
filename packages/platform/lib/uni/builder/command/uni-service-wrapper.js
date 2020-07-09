const path = require('path')
const Service = require('@vue/cli-service/lib/Service')


const service = new Service(process.env.VUE_CLI_CONTEXT)



// global.uniPlugin.chainWebpack.push

service.run('uni-build', {
  watch: true
}).catch(e => {
  error(e)
  process.exit(1)
})