const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
module.exports = function createTestProject(name, preset, cwd, initGit = true) {
  delete process.env.VUE_CLI_SKIP_WRITE

  cwd = cwd || path.resolve(__dirname, '../../test')

  const projectRoot = path.resolve(cwd, name)
  const read = file => {
    return fs.readFile(path.resolve(projectRoot, file), 'utf-8')
  }

  const has = file => {
    return fs.existsSync(path.resolve(projectRoot, file))
  }

  if (has(projectRoot)) {
    console.warn(
      `An existing test project already exists for ${name}. May get unexpected test results due to project re-use`,
    )
  }

  const ln = (file, from, type = 'dir') => {
    return fs.ensureSymlink(from, path.resolve(projectRoot, file), type)
  }

  const write = (file, content) => {
    const targetPath = path.resolve(projectRoot, file)
    const dir = path.dirname(targetPath)
    return fs.ensureDir(dir).then(() => fs.writeFile(targetPath, content))
  }

  const rm = file => {
    return fs.remove(path.resolve(projectRoot, file))
  }

  const run = request => {
    // [command, ...args] = command.split(/\s+/)
    // if (command === 'vue-cli-service') {
    //   // appveyor has problem with paths sometimes
    //   command = require.resolve('@vue/cli-service/bin/vue-cli-service')
    // }
    // return execa(command, args, { cwd: projectRoot })
    const rawArgv = request.split(/\s+/).slice(1)

    const Service = require('@vue/cli-service/lib/Service')
    const service = new Service(projectRoot)
    const args = require('minimist')(rawArgv, {
      boolean: [
        // build
        'modern',
        'report',
        'report-json',
        'inline-vue',
        'watch',
        // serve
        'open',
        'copy',
        'https',
        // inspect
        'verbose',
      ],
    })
    const command = args._[0]

    service.run(command, args, rawArgv).catch(err => {
      console.error(err)
      // process.nextTick(() => process.exit(1))
    })
  }

  const destory = () => {
    return fs.remove(projectRoot)
  }

  const cliBinPath = require.resolve('@vue/cli/bin/vue')
  const args = ['create', name, '--force', '--inlinePreset', JSON.stringify(preset), initGit ? '--git' : '--no-git']

  const options = {
    cwd,
    stdio: 'inherit',
  }

  return fs.mkdirp(projectRoot).then(() => ({
    dir: projectRoot,
    has,
    ln,
    read,
    destory,
    write,
    run,
    rm,
  }))

  // return execa.node(cliBinPath, args, options).then(() => ({
  //   dir: projectRoot,
  //   has,
  //   read,
  //   write,
  //   run,
  //   rm
  // }))
}
