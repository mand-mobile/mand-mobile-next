const path = require('path')
const {create} = require('./__helper__/create')

jest.setTimeout(80000)

let project: any

beforeAll(async () => {

  project = await create('mand-mobile', {})

})  

afterAll(async () => {
  await project.destory()
})

test('should run registerd command success', async () => {
 
  await project.write('src/main.js', `
  const x = function () {
    setTimeout(
      // eslint-disable-next-line
      () => console.log(...arguments), 100
    );
  }
  x(1, 2)
  `)
  await project.run('vue-cli-service md-install')

  expect(1).toBe(1)
})


test