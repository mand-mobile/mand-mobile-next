import { componentEntrys } from './rollup.config'
import path from 'path'
import fs from 'fs'

function genDocs(lang = 'zh-CN') {
  const descDir = path.resolve(
    process.cwd(),
    `docs/${lang}/components`
  )

  fs.mkdirSync(descDir, {
    recursive: true,
  })
  fs.copyFileSync(
    path.resolve(
      process.cwd(),
      lang === 'zh-CN'
        ? 'CHANGELOG.md'
        : 'CHANGELOG.en-US.md'
    ),
    path.resolve(descDir, 'index.md')
  )
  fs.copyFileSync(
    path.resolve(
      process.cwd(),
      lang === 'zh-CN'
        ? 'quick-start.md'
        : 'quick-start.en-US.md'
    ),
    path.resolve(descDir, 'quick-start.md')
  )
  componentEntrys.forEach((item) => {
    const name = path.basename(path.dirname(item))
    fs.existsSync(
      path.resolve(
        path.dirname(item),
        lang === 'zh-CN' ? 'README.md' : 'README.en-US.md'
      )
    ) &&
      fs.copyFileSync(
        path.resolve(
          path.dirname(item),
          lang === 'zh-CN' ? 'README.md' : 'README.en-US.md'
        ),
        path.resolve(descDir, name + '.md')
      )
  })
}

genDocs()
genDocs('en-US')
