import { createServer } from 'fisand-doc'
import { createLogger } from 'vite'
import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'

const logger = createLogger()

async function devDocs() {
  const server = await createServer('docs', {
    host: true,
  })

  await server.listen()

  server.watcher.on('ready', () => {
    docsChangeWatcher()
  })
}

devDocs()

function docsChangeWatcher() {
  const src = path.resolve(process.cwd(), 'src/packages')

  chokidar
    .watch(src, {
      ignored(path: string) {
        return (
          path.endsWith('.js') ||
          path.endsWith('.vue') ||
          path.endsWith('.ts') ||
          path.endsWith('.styl') ||
          path.endsWith('.css')
        )
      },
      ignoreInitial: true,
    })
    .on('all', (_, filePath) => {
      const compoentName = path.basename(
        path.dirname(filePath)
      )

      const copyFile = (lang) => {
        const descFile = path.resolve(
          process.cwd(),
          `docs/${lang}/components`,
          path.basename(compoentName) + '.md'
        )
        fs.mkdirSync(path.dirname(descFile), {
          recursive: true,
        })
        fs.copyFileSync(filePath, descFile)
      }

      if (path.basename(filePath) === 'README.md') {
        copyFile('zh-CN')
      } else if (
        path.basename(filePath) === 'README.en-US.md'
      ) {
        copyFile('en-US')
      }
    })
}
