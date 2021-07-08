import path from 'path'
import fs from 'fs'
import { cwd } from 'process'
import { rollup, InputOptions, OutputOptions } from 'rollup'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import { Project, SourceFile } from 'ts-morph'
import vueCompiler from '@vue/compiler-sfc'
import klawSync from 'klaw-sync'
import chalk from 'chalk'
import ora from 'ora'

const inputOptions: InputOptions = {
  input: 'src/packages/mand-mobile.ts',
  external(id) {
    const reg =
      /^vue/.test(id) ||
      /^@vue/.test(id) ||
      /^@better-scroll/.test(id) ||
      /^mand-mobile\//.test(id) ||
      /^jpeg-js/.test(id)
    return reg
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          emitDeclarationOnly: true,
          declarationDir: 'dist/types', // doesnot wokr with rollup
        },
        include: [
          'src/packages/**/*',
          'src/shims-vue.d.ts',
        ],
        exclude: [
          'node_modules',
          'src/packages/**/__test__/*',
          'src/packages/**/demo/*',
          'docs',
        ],
        abortOnError: false,
      },
    }),
    vue({
      target: 'browser',
      preprocessStyles: true,
      preprocessOptions: {
        stylus: {
          additionalData: `@import '${process.cwd()}/src/styles/index.styl'`,
        },
      },
      exposeFilename: false,
    }),
    alias({
      entries: [
        {
          find: /^(mand-mobile\/)(.*)/,
          replacement: `${path.resolve(
            __dirname,
            '../src/packages'
          )}/$2/index.ts`,
        },
      ],
    }),
  ],
}

const outputOptions: OutputOptions = {
  file: `dist/es/mand-mobile.esm.js`,
  format: 'es',
  globals: {
    vue: 'Vue',
  },
  paths: (id) => {
    if (/^mand-mobile/.test(id)) {
      return id.replace('mand-mobile/', './')
    }
  },
}

const generateTypes = async () => {
  const bundle = await rollup(inputOptions)

  await Promise.all([
    bundle.write(outputOptions),
    bundle.write({
      ...outputOptions,
      file: `dist/lib/mand-mobile.umd.js`,
      format: 'umd',
      name: `mand-mobile`,
    }),
  ])
}

/**
 * fork from https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
const genVueTypes = async () => {
  const tsConfigFilePath = fs.existsSync(
    path.resolve(cwd(), 'tsconfig.json')
  )
    ? path.resolve(cwd(), 'tsconfig.json')
    : undefined

  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(cwd(), 'dist'),
    },
    tsConfigFilePath,
    skipAddingFilesFromTsConfig: true,
  })

  const sourceFiles: SourceFile[] = []

  const filePaths = klawSync(
    path.resolve(cwd(), 'src/packages'),
    {
      nodir: true,
      depthLimit: 1,
    }
  )
    .map((item) => item.path)
    .filter((path) => path.endsWith('.vue'))

  await Promise.all(
    filePaths.map(async (file) => {
      const content = await fs.promises.readFile(
        file,
        'utf-8'
      )
      const sfc = vueCompiler.parse(
        content as unknown as string
      )
      const { script, scriptSetup } = sfc.descriptor
      if (script || scriptSetup) {
        let content = ''
        let isTS = false
        if (script && script.content) {
          content += script.content
          if (script.lang === 'ts') isTS = true
        }
        if (scriptSetup) {
          const compiled = vueCompiler.compileScript(
            sfc.descriptor,
            {
              id: 'xxx',
            }
          )
          content += compiled.content
          if (scriptSetup.lang === 'ts') isTS = true
        }
        const sourceFile = project.createSourceFile(
          path.relative(process.cwd(), file) +
            (isTS ? '.ts' : '.js'),
          content
        )
        sourceFiles.push(sourceFile)
      }
    })
  )

  project.getPreEmitDiagnostics()

  project.emitToMemory()

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath()
      const customPath = filepath.replace('/types/', '/es/')
      await Promise.all([
        fs.promises.writeFile(
          customPath,
          outputFile.getText(),
          'utf8'
        ),
        fs.promises.writeFile(
          customPath.replace('/es/', '/lib/'),
          outputFile.getText(),
          'utf8'
        ),
      ])
    }
  }
}

const spinner = ora('Generate types...\n').start()

Promise.all([genVueTypes(), generateTypes()])
  .then(() => spinner.succeed('Success !\n'))
  .catch(() => spinner.fail('Error !\n'))
