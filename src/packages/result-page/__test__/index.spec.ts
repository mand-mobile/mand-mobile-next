import { mount } from '@vue/test-utils'
import ResultPage from '../index.vue'

describe('ResultPage.vue', () => {
  test('render', () => {
    const wrapper = mount(ResultPage, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-result-page')
  })
})
