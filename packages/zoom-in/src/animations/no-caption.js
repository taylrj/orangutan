import { isSvg } from '../utils'

/**
 * animate function for zoom component
 * @param {Object} config - The config object for animation
 * @param {HTMLDivElement | null} config.originalRef
 * @param {HTMLDivElement | null} config.zoomedRef
 * @param {Theme} config.themeContext
 */
const animate = ({ originalRef, zoomedRef, themeContext }) => {
  if (!originalRef.current || !zoomedRef.current) return
  const { frame, image, zoomOptions } = themeContext

  const { marginTop, marginLeft, marginRight, marginBottom } = image
  const { transitionDuration, transitionFunction } = zoomOptions

  const zoomTarget = originalRef.current

  const viewportWidth = frame.width - (marginLeft + marginRight)
  const viewportHeight = frame.height - (marginTop + marginBottom)

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
    (-left + (viewportWidth - width) / 2 + marginLeft + frame.left) / scale
  const translateY =
    (-top + (viewportHeight - height) / 2 + marginTop + frame.top) / scale

  const transform = `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`
  const transition = `transform ${transitionDuration}ms ${transitionFunction}`
  zoomedRef.current.style.transition = transition
  zoomedRef.current.style.transform = transform
}

export default animate
