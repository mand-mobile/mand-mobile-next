import Demo0 from './cases/demo0'
import {renderToString} from '@vue/server-test-utils'

describe('Dialog - Demo', () => {
  test(`Basic`, async () => {
    expect(await renderToString(Demo0)).toMatchSnapshot()
  })
})
