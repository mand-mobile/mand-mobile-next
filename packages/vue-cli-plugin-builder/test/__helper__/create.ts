
const path = require('path')
const createTestProject = require('./createTestProject')

export async function create (name: string, presets: any) {

  const testProjects = path.resolve(__dirname, '../__test__/projects')
  const project = await createTestProject(name, presets, testProjects, false)
  
  const pkg = {
    devDependencies: {
      "@mand-mobile/vue-cli-plugin-builder": "<placeholder/>"
    }
  }

  project.ln('node_modules', path.resolve(__dirname, '../../node_modules'))
  // project.ln('node_modules/@mand-mobile/vue-cli-plugin-builder', path.resolve(__dirname, '../../'))

  // mock
  await project.write('package.json', JSON.stringify(pkg, null, 2))


  return Promise.resolve(project)
}
