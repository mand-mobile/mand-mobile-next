import { mount } from '@vue/test-utils'
import TabPicker from '../index.vue'
import data from '../demo/data.json'

describe('TabPicker.vue', () => {
  test('render', async () => {
    const wrapper = mount(TabPicker, {
      props: {
        data,
      },
    })
    await Promise.resolve()
    const tabPicker = document.body.querySelector(
      '.md-slide-up'
    ) as any
    expect(tabPicker.style.display).toContain('none')
  })
})
