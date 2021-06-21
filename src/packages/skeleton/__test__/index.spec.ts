import { mount } from '@vue/test-utils'
import Skeleton from '../index.vue'

describe('Skeleton.vue', () => {
  test('render', () => {
    const wrapper = mount(Skeleton, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.html()).toContain('md-skeleton')
  })

  test('prop avatar should be work', () => {
    const wrapper = mount(Skeleton, {
      props: {
        avatar: true,
      },
    })
    expect(wrapper.html()).toContain('md-skeleton-avatar')
  })

  test('prop avatar should be work', () => {
    const wrapper = mount(Skeleton, {
      props: {
        avatar: true,
        row: 4,
      },
    })
    expect(wrapper.html()).toContain('md-skeleton-row')
    expect(wrapper.html()).toContain('md-skeleton-avatar')
  })

  test('prop avatarSize should be work', () => {
    const wrapper = mount(Skeleton, {
      props: {
        loadding: true,
        avatar: true,
        avatarSize: 'lg',
      },
    })
    expect(wrapper.html()).toContain(
      'md-skeleton-avatar-large'
    )
  })

  test('prop avatarSize should be work', () => {
    const wrapper = mount(Skeleton, {
      props: {
        loadding: true,
        avatar: true,
        avatarSize: 'sm',
      },
    })
    expect(wrapper.html()).toContain(
      'md-skeleton-avatar-small'
    )
  })

  test('prop rowWidth should be work', () => {
    const wrapper = mount(Skeleton, {
      props: {
        loadding: true,
        rowWidth: [20],
      },
    })
    expect(wrapper.html()).toContain('width: 20%')
  })

  test('prop titleWidth should be work', () => {
    const wrapper = mount(Skeleton, {
      props: {
        loadding: true,
        title: true,
        titleWidth: 20,
      },
    })
    expect(wrapper.html()).toContain('width: 20%')
  })

  test('prop loadding set false should be work', () => {
    const wrapper = mount(Skeleton, {
      props: {
        loadding: false,
        titleWidth: '',
      },
    })

    const skeletons = wrapper.findAllComponents(Skeleton)
    expect(skeletons).toHaveLength(0)
  })

  test('getTitleWidth', () => {
    const wrapper = mount(Skeleton, {
      props: {
        rowWidth: 10,
        titleWidth: '20%',
      },
    })
    expect(wrapper.vm.getRowWidth()).toBe('10%')
    expect(wrapper.vm.getTitleWidth()).toBe('20%')
  })
})
