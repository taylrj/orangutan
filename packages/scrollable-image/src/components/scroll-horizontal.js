import PropTypes from 'prop-types'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

// TODO add waypoint
const BodyOverflowHidden = createGlobalStyle`
  body {
    overflow: ${props => (props.active ? 'hidden' : 'auto')};
  }
`

const FullViewportWidthWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: ${props => props.height}px;
  overflow: hidden;
`

const ScrollableComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

class ScrollHorizontal extends React.PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isActive: true,
  }
  constructor(props) {
    super(props)
    this.scrollLeft = 0
    this.childrenHeight = 0
    this.touchStartY = 0
    this.wrapper = React.createRef()
    this.children = React.createRef()
    this.handleScroll = this._handleScroll.bind(this)
    this.handleTouchStart = this._handleTouchStart.bind(this)
    this.handleTouchMoveEnd = this._handleTouchMoveEnd.bind(this)
    this.getChildrenHeight = this._getChildrenHeight.bind(this)
  }

  componentDidMount() {
    this.getChildrenHeight()
    window.addEventListener('resize', this.getChildrenHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getChildrenHeight)
  }

  _getChildrenHeight() {
    this.childrenHeight = this.children.current.clientHeight
    this.forceUpdate()
  }

  _handleScroll(event) {
    const { deltaY } = event
    const { isActive } = this.props
    if (window && isActive) {
      this.scroll(deltaY)
    }
  }

  scroll(delta) {
    const scrollTo = this.calcScrollTo(delta)
    this.children.current.style.transform = `translate(-${scrollTo}px, 0)`
    this.scrollLeft = scrollTo
  }

  calcScrollTo(delta) {
    const maxScrollLeft = this.children.current.clientWidth - window.innerWidth
    const nextScrollLeft = this.scrollLeft + delta
    return Math.min(Math.max(0, nextScrollLeft), maxScrollLeft)
  }

  _handleTouchStart(event) {
    this.touchStartY = event.touches[0].screenY
  }

  _handleTouchMoveEnd(event) {
    const changedTouchPosition = event.changedTouches[0].screenY
    const deltaY = this.touchStartY - changedTouchPosition
    this.scroll(deltaY)
    this.touchStartY = changedTouchPosition
  }

  render() {
    const { isActive } = this.props
    return (
      <FullViewportWidthWrapper ref={this.wrapper} height={this.childrenHeight}>
        <BodyOverflowHidden active={isActive} />
        <ScrollableComponent
          ref={this.children}
          onWheel={this.handleScroll}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMoveEnd}
          onTouchEnd={this.handleTouchMoveEnd}
        >
          {this.props.children}
        </ScrollableComponent>
      </FullViewportWidthWrapper>
    )
  }
}

export default ScrollHorizontal
