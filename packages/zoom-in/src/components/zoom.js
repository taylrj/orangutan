import PropTypes from 'prop-types'
import React, {
  Children,
  cloneElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import merge from 'lodash/merge'
import styled, { ThemeContext } from 'styled-components'
import useEventListener from '../hooks/use-event-listener'
import { isSvg } from '../utils'

const _ = {
  merge,
}

const Container = styled.div`
  position: relative;
`

const Original = styled.div`
  visibility: hidden;
  ${props =>
    props.isZoomed
      ? `position: absolute;
		 left: 0;
     top: 0;`
      : `position: relative;`}
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: opacity ${props => props.transitionDuration}ms;
  background: ${props => props.background};
  ${props =>
    props.show
      ? `cursor: pointer;
     cursor: zoom-out;`
      : ''}
`

const Zoomable = styled.div`
  cursor: pointer;
  cursor: zoom-in;
  ${props =>
    props.isZoomed
      ? `cursor: pointer;
     cursor: zoom-out;`
      : `position: absolute;
		 left: 0;
     top: 0;
     `}
`

const Caption = styled.figcaption`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  margin: 0;
  color: ${props => props.fontColor};
  font-size: ${props => props.fontSize}px;
  line-height: ${props => props.lineHeight}px;
  letter-spacing: ${props => props.letterSpacing}px;
  transition: opacity ${props => props.duration}ms;
`

const getZoomOptions = options =>
  _.merge(
    {
      scrollableEl: document,
      transitionDuration: 200,
      transitionFunction: 'cubic-bezier(0.2, 0, 0.2, 1)',
      captionDelay: 200,
      scrollOffset: 30,
    },
    options
  )

const Zoom = ({ children, caption, options }) => {
  const zoomOptions = getZoomOptions(options)
  const themeContext = useContext(ThemeContext)

  const [isZoomed, setZoom] = useState(false)
  const overlayRef = useRef(null)
  const originalChildrenRef = useRef(null)
  const zoomedRef = useRef(null)
  const containerRef = useRef(null)
  const captionRef = useRef(null)

  let isAnimating = false
  const setAnimating = bool => {
    isAnimating = bool
  }

  const getCaptionHeight = () => {
    const {
      captionFontSize,
      captionLetterSpacing,
      captionWidth,
      captionLineHeight,
    } = themeContext
    return (
      Math.ceil(
        (caption.length * (captionFontSize + captionLetterSpacing)) /
          captionWidth
      ) * captionLineHeight
    )
  }

  const animate = () => {
    if (!originalChildrenRef.current || !zoomedRef.current) return
    const {
      frame,
      marginLeft,
      marginRight,
      captionWidth,
      captionMarginBottom,
      marginTop,
      marginBottom,
    } = themeContext
    const { transitionDuration, transitionFunction, captionDelay } = zoomOptions

    // TODO: separate different animate function by caption position

    const zoomTarget = originalChildrenRef.current
    const viewportWidth = frame.width - (marginLeft + marginRight)
    const viewportHeight =
      frame.height -
      (getCaptionHeight() + captionMarginBottom) -
      (marginTop + marginBottom)

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

    captionRef.current.setAttribute(
      'style',
      `position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      visibility: visible;
      width: ${captionWidth}px;
      transform: translate(
        ${translateX * scale + (width - scale * width) / 2}px, 
        ${translateY * scale + (height + scale * height) / 2 + marginBottom}px
      );
      margin-bottom: ${captionMarginBottom}px;
      transition: opacity ${captionDelay}ms;
    `
    )
  }

  const handleOpenEnd = () => {
    if (!isAnimating) return
    if (!zoomedRef.current || !captionRef.current) return

    setAnimating(false)
    captionRef.current.style.opacity = 1
    zoomedRef.current.removeEventListener('transitionend', handleOpenEnd)
  }

  let scrollTop = 0

  const open = ({ target } = {}) => {
    if (!target) return
    if (isZoomed) return
    if (!containerRef.current || !overlayRef.current || !zoomedRef.current)
      return

    scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    setAnimating(true)
    containerRef.current.style.zIndex = themeContext.overlayZindex
    overlayRef.current.style.display = 'block'
    window.requestAnimationFrame(() => {
      overlayRef.current.style.opacity = themeContext.opacity
    })

    zoomedRef.current.addEventListener('transitionend', handleOpenEnd)
    setZoom(true)
    animate()
  }

  const handleCloseEnd = () => {
    if (!zoomedRef.current) return

    setZoom(false)
    setAnimating(false)
    zoomedRef.current.removeEventListener('transitionend', handleCloseEnd)
  }

  const close = () => {
    if (isAnimating) return
    if (!containerRef.current || !overlayRef.current || !zoomedRef.current)
      return

    containerRef.current.style.zIndex = '0'
    overlayRef.current.style.display = 'none'
    setAnimating(true)
    overlayRef.current.style.opacity = '0'
    zoomedRef.current.addEventListener('transitionend', handleCloseEnd)
    zoomedRef.current.style.transform = ''

    captionRef.current.setAttribute(
      'style',
      `position: absolute;
       top: 0;
       left: 0;
       opacity: 0;
       visibility: hidden;
       transition: opacity ${captionDelay}ms;`
    )
    handleCloseEnd()
  }

  const toggle = ({ target } = {}) => {
    if (isZoomed) {
      return close()
    }
    return open({ target })
  }

  const handleScroll = () => {
    if (isAnimating) return

    const currentScroll =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) {
      setTimeout(close, 150)
    }
  }

  const handleKeyUp = event => {
    const key = event.key || event.keyCode

    // Close if escape key is pressed
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      close()
    }
  }

  useEffect(() => {
    if (!originalChildrenRef.current || !zoomedRef.current) return
    originalChildrenRef.current.style.width = '100%'
    zoomedRef.current.style.width = '100%'
  })
  useEventListener(document, 'keyup', handleKeyUp)
  useEventListener(zoomOptions.scrollableEl, 'scroll', handleScroll)
  useEventListener(window, 'resize', close)

  if (Children.count(children) !== 1) {
    console.error(`
      Error: Adjacent JSX elements must be wrapped in an enclosing tag. 
      Did you want a <div>...</div>?
    `)
    return null
  }

  const {
    background,
    captionFontSize,
    captionLineHeight,
    captionLetterSpacing,
    captionColor,
  } = themeContext
  const { transitionDuration, captionDelay } = zoomOptions

  return (
    <Container ref={containerRef}>
      <Original isZoomed={isZoomed} onClick={toggle}>
        {cloneElement(children, { ref: originalChildrenRef })}
      </Original>
      <Overlay
        ref={overlayRef}
        show={isZoomed}
        background={background}
        onClick={close}
        transitionDuration={transitionDuration}
      />
      <Zoomable isZoomed={isZoomed} onClick={toggle}>
        {cloneElement(children, { ref: zoomedRef })}
      </Zoomable>
      <Caption
        ref={captionRef}
        fontSize={captionFontSize}
        lineHeight={captionLineHeight}
        letterSpacing={captionLetterSpacing}
        color={captionColor}
        duration={captionDelay}
      >
        {caption}
      </Caption>
    </Container>
  )
}

Zoom.propTypes = {
  // TODO: define !
  options: PropTypes.object,
  children: PropTypes.node.isRequired,
  caption: PropTypes.string,
}

Zoom.defaultProps = {
  options: {},
  caption: '',
}

export default Zoom
