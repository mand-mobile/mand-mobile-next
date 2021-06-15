import { ExtractPropTypes } from 'vue'

const DEFAULT_TITLE_WIDTH = '40%'
const DEFAULT_WIDTH = '100%'

export const skeletonProps = {
  loading: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: Boolean,
    default: false,
  },
  row: {
    type: Number,
    default: 3,
  },
  title: {
    type: Boolean,
    default: false,
  },
  titleWidth: {
    type: [Number, String],
    default: DEFAULT_TITLE_WIDTH,
  },
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_WIDTH,
  },
  avatarSize: {
    type: String,
    default: 'md',
  },
}

export const useSkeleton = (
  props: ExtractPropTypes<typeof skeletonProps>
) => {
  const isNumber = (n: number | string) => {
    return typeof n === 'number'
  }

  const getRowWidth = (index: number) => {
    const rowWidth: string | number | Array<any> =
      props.rowWidth

    if (props && Array.isArray(rowWidth)) {
      const newRowWidth = rowWidth[index]
      return isNumber(newRowWidth)
        ? `${newRowWidth}%`
        : newRowWidth
    } else if (rowWidth) {
      return isNumber(rowWidth as string | number)
        ? `${rowWidth}%`
        : rowWidth
    }
    return DEFAULT_WIDTH
  }

  const getTitleWidth = () => {
    const titleWidth = props.titleWidth
    if (titleWidth) {
      return isNumber(titleWidth)
        ? `${titleWidth}%`
        : titleWidth
    }
    return DEFAULT_TITLE_WIDTH
  }

  return {
    getRowWidth,
    getTitleWidth,
  }
}
