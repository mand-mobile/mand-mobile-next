import { rollup } from 'rollup'
import { spawn } from 'child_process'
import configs from './rollup.config'

let index = 0

async function run() {
  if (!configs[index]) return

  // const buildProcess = spawn
  const bundle = await rollup(configs[index])
  await bundle.write(configs[index].output[1])
  index++
  run()
}

run()
