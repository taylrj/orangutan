import { isSvg } from '../utils'

/**
 * animate function for zoom component
 * @param {Object} config - The config object for animation
 * @param {HTMLDivElement | null} config.originalRef
 * @param {HTMLDivElement | null} config.zoomedRef
 * @param {Theme} config.themeContext
 * @param {number} config.captionHeight
 */
const animate = ({
  originalRef,
  zoomedRef,
  captionRef,
  themeContext,
  captionHeight,
}) => {
  if (!originalRef.current || !zoomedRef.current) return
  const { frame, image, caption, zoomOptions } = themeContext
  const { transitionDuration, transitionFunction } = zoomOptions

  const zoomTarget = originalRef.current

  const viewportWidth = frame.width - (image.marginLeft + image.marginRight)
  const viewportHeight =
    frame.height -
    (captionHeight + caption.marginBottom) -
    (image.marginTop + image.marginBottom)

  const naturalWidth = isSvg(zoomTarget)
    ? viewportWidth
    : zoomTarget.naturalWidth || viewportWidth
  const naturalHeight = isSvg(zoomTarget)
    ? viewportHeight
    : zoomTarget.naturalHeight || viewportHeight
  const { top, left, width, height } = zoomTarget.getBoundingClientRect()

  const scaleX = Math.min(naturalWidth, viewportWidth) / width
  const scaleY = Math.min(naturalHeight, viewportHeight) / height
  const scale = Math.min(scaleX, scaleY)
  const translateX =
    (-left + (viewportWidth - width) / 2 + image.marginLeft + frame.left) /
    scale
  const translateY =
    (-top + (viewportHeight - height) / 2 + image.marginTop + frame.top) / scale

  const transform = `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`
  const transition = `transform ${transitionDuration}ms ${transitionFunction}`
  zoomedRef.current.style.transition = transition
  zoomedRef.current.style.transform = transform

  if (captionRef.current) {
    captionRef.current.setAttribute(
      'style',
      `position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      visibility: visible;
      width: ${caption.width}px;
      transform: translate(${translateX * scale +
        (width - scale * width) / 2 +
        caption.offset}px, ${translateY * scale +
        (height + scale * height) / 2 +
        image.marginBottom}px);
      margin-bottom: ${caption.marginBottom}px;
      `
    )
  }
}

export default animate
