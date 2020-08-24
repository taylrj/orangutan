import captionSideBottom from './caption-side-bottom'
import captionSideRight from './caption-side-right'
import noCaption from './no-caption'

const captionSide = {
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  top: 'top',
}

export default {
  // TODO: add other animes
  [captionSide.bottom]: captionSideBottom,
  [captionSide.right]: captionSideRight,
  default: noCaption,
}
