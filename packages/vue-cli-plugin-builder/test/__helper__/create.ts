
const path = require('path')
const createTestProject = require('./createTestProject')

export async function create (name: string, presets: any) {

  const testProjects = path.resolve(__dirname, '../__fixtures__/projects')
  const project = await createTestProject(name, presets, testProjects, false)

  // mock
  const pkg = JSON.parse(await project.read('package.json'))
  pkg.devDependencies['@mand-mobile/vue-cli-plugin-builder'] = '../../../../'

  await project.write('package.json', JSON.stringify(pkg, null, 2))

  // const invoke = require('@vue/cli/lib/invoke')
  // await invoke('i18n', {}, project.dir)


  return Promise.resolve(project)
}
