jest.setTimeout(80000)

const {create} = require('./__helper__/create')

test('should run registerd command success', async () => {
 
  const plugins = {
    '@vue/cli-plugin-babel': {},
  }
  
  const project = await create('mand-mobile', {plugins})

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