import PropTypes from 'prop-types'
import React, {
  cloneElement,
  useRef,
  useState,
  useEffect,
  Children,
} from 'react'
import assign from 'lodash/assign'
import styled from 'styled-components'
import useEventListener from '../hooks/use-event-listener'
import { isSvg } from '../utils'

const _ = {
  assign,
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
  transition: opacity 300ms;
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

const defaultWrapper = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

const Zoom = ({ options = {}, wrapper = defaultWrapper, children }) => {
  let scrollTop = 0

  const zoomOptions = _.assign(
    {
      margin: 0,
      background: '#fff',
      opacity: 1,
      overlayZindex: 1,
      scrollOffset: 40,
      scrollableEl: document,
      transitionDuration: 300,
      transitionFunction: 'cubic-bezier(0.2, 0, 0.2, 1)',
    },
    options
  )

  const viewportWidth = wrapper.width - zoomOptions.margin * 2
  const viewportHeight = wrapper.height - zoomOptions.margin * 2

  const [isZoomed, setZoom] = useState(false)
  const overlayRef = useRef(null)
  const originalChildrenRef = useRef(null)
  const zoomedRef = useRef(null)
  const containerRef = useRef(null)

  let isAnimating = false
  const setAnimating = bool => {
    isAnimating = bool
  }

  const animate = () => {
    if (!originalChildrenRef.current || !zoomedRef.current) return

    const zoomTarget = originalChildrenRef.current
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
      (-left +
        (viewportWidth - width) / 2 +
        zoomOptions.margin +
        wrapper.left) /
      scale
    const translateY =
      (-top +
        (viewportHeight - height) / 2 +
        zoomOptions.margin +
        wrapper.top) /
      scale
    const transform = `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`
    const transition = `transform ${zoomOptions.transitionDuration}ms ${zoomOptions.transitionFunction}`

    zoomedRef.current.setAttribute(
      'style',
      `
      transition: ${transition};
      transform: ${transform};
    `
    )
  }

  const handleOpenEnd = () => {
    if (!isAnimating) return
    if (!zoomedRef.current) return

    setAnimating(false)
    zoomedRef.current.removeEventListener('transitionend', handleOpenEnd)
  }

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
    containerRef.current.style.zIndex = zoomOptions.overlayZindex
    overlayRef.current.style.display = 'block'
    window.requestAnimationFrame(() => {
      overlayRef.current.style.opacity = zoomOptions.opacity
    })

    zoomedRef.current.addEventListener('transitionend', handleOpenEnd)
    setZoom(true)
    animate()
    handleOpenEnd()
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

  return (
    <Container ref={containerRef}>
      <Original isZoomed={isZoomed} onClick={toggle}>
        {cloneElement(children, { ref: originalChildrenRef })}
      </Original>
      <Overlay
        ref={overlayRef}
        show={isZoomed}
        background={zoomOptions.background}
        onClick={close}
      />
      <Zoomable isZoomed={isZoomed} onClick={toggle}>
        {cloneElement(children, { ref: zoomedRef })}
      </Zoomable>
    </Container>
  )
}

Zoom.propTypes = {
  options: PropTypes.object,
  children: PropTypes.node.isRequired,
  wrapper: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
  }),
}

Zoom.defaultProps = {
  options: {},
  wrapper: {},
}

export default Zoom
