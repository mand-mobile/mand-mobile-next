import {compileFile, renderDir, exportFile} from '../src/index'
import * as  path from 'path'
import { readFile } from 'fs-extra'


/**
 * 基于EJS语法编译字符串
 */
it.skip('should render a file and return a compiled string', async () => {

  let source = path.resolve(__dirname, '__fixtures__/render-template/test.html')
  const result = await compileFile(source, {user: {name: 'lisi'}}, {})
  expect(String.prototype.trim.call(result.content)).toEqual('<h2>lisi</h2>')
  
})


/**
 * 导出文件
 */
it.skip ('should export a file with right directory', async () => {
  let sourceRoot = path.resolve(__dirname, '__fixtures__/render-template')
  let source = path.resolve(sourceRoot, 'test.html')
  const result = await compileFile(source, {user: {name: 'lisi'}}, {root: sourceRoot})
  const target = await exportFile(result, {root: path.join(__dirname, '__temp__')})
  const filecontent = await readFile(target)
  expect(String.prototype.trim.call(filecontent)).toEqual('<h2>lisi</h2>')

})

/**
 * 
 */
it.skip('should render a directory and preserve original structure', async () => {

  let sourceDir = path.resolve(__dirname, '__fixtures__/render-template')

  return renderDir(sourceDir, {user: {name: 'zhangsan'}}, {distRoot: path.resolve(__dirname, '__temp__/tmpdir')})

})


