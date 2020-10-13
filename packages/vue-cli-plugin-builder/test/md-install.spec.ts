const {create} = require('./__helper__/create')

const TEST_TIMEOUT = 800000

jest.setTimeout(TEST_TIMEOUT)

const sleepFactory = (timeout: number) => () => new Promise((res, rej) => setTimeout(res, timeout))

const sleep = sleepFactory(TEST_TIMEOUT / 2)

let project: any

beforeAll(async () => {
  project = await create('mand-mobile', {})
})  

afterAll(async () => {
  // await project.destory()
})

describe('md-install test suites', () => {
  // @fixme 应该允许用户传入 --theme 用于自定义主题
  // @fixme 应该允许用户传入 --components-source 用于二次构建需要的bundle|lib|component
  // @fixme --target 可用枚举值为 bundle|lib|sfc
  // @fixme --platform 可用枚举值为 web|uni
  // @fixme --transformCss 当target为sfc时需要判断是否需要将template中的stylus转换为css
  // @fixme --exactCss 是否抽取css作为单独的文件 暂时先支持到 --target lib, bundle 后边考虑为sfc也支持这一能力
  it('should build bundle in web platform', async () => {
    await project.run('vue-cli-service md-install --platform web --target bundle --output=web/bundle')
    await sleep()
  })

  it('should build vueify lib in web platform', async () => {
    await project.run('vue-cli-service md-install --platform web --target lib --output=web/lib')
    await sleep()
  })

  it('should build components in web platform', async () => {
    await project.run('vue-cli-service md-install --platform web --target sfc --output=web/src')
    await sleep()
  })

  it('should build components in uni platform', async () => {
    await project.run('vue-cli-service md-install --platform uni --target sfc --output=uni/src')
    await sleep()
  })

  it('should build components and transform stylus in css', async () => {
    await project.run('vue-cli-service md-install --platform uni --target sfc --transformCss true --output uni/lib-transform')
    await sleep()
  })

  it('should build components and transform stylus with external theme files', async () => {
    await project.run('vue-cli-service md-install --platform uni --target sfc --theme ./theme.styl --output my-uni/lib')
    await sleep()
  })

  it('should build components with compoents-source', async () => {
    await project.run('vue-cli-service md-install --platform web --target bundle --components-souece=./components --output=my-web/bundle')
    await sleep()
  })
})

describe.only('md-preview test suites', () => {

  // @fixme 如果传入了 --output 可以产出examples包, 如果NODE_ENV为production的话可以产出生产环境的包
  // @fixme 应该允许用户传入 --components-source，用于开发和调试通过 md-install 生成的组件代码
  // @fixme 允许用户传入--watch 参数，用于支持 componentSource变更之后自动重新构建
  it('should preview components in web platform', async () => {
    await project.run('vue-cli-service md-preview --platform web')
    await sleep()
  })

  it('should preview components in web platform in watch mode', async () => {
    await project.run('vue-cli-service md-preview --platform web --watch')
    await sleep()
  })

  it('should preview specific component in web platform, such as button', async () => {
    await project.run('vue-cli-service md-preview --platform web --single --component-name button')
    await sleep()
  })


  it('should preview components in uni platform', async () => {
    await project.run('vue-cli-service md-preview --platform uni --output dist/dev/mp')
    await sleep()
  })

  it('should preview specific component in web platform, such as button', async () => {
    await project.run('vue-cli-service md-preview --platform uni --output dist/dev/mp --single --component-name button')
    await sleep()
  })

  it.only('should preview specific component in web platform in watch mode ', async () => {
    await project.run('vue-cli-service md-preview --platform uni --output dist/dev/mp --single --component-name button --watch')
    await sleep()
  })

  it(
    'should preview specific component in web platform, such as picker', async () => {
    await project.run('vue-cli-service md-preview --platform uni --output dist/dev/mp --single --component-name picker')
    await sleep()
  })

  it('should preview components in web platform with watch and component-source options', async() => {
    await project.run('vue-cli-service md-preview --platform uni --watch')
    await sleep()
  })

})



