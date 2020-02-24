import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import withWaypoints from './with-waypoints'

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`

const ScrollableComponent = styled.div`
  position: ${props => (props.isActive ? 'fixed' : 'absolute')};
  ${props => (props.alignBottom ? 'bottom: 0' : 'top: 0')};
  width: 100%;
  height: 100vh;
  left: 0;
  margin-top: 0;
  margin-bottom: 0;
  img {
    height: 100vh;
    width: auto;
  }
`

class ScrollHorizontal extends React.PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    verticalDirection: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isActive: true,
    verticalDirection: null,
  }

  constructor(props) {
    super(props)
    this.distanceFromTop = 0
    this.aspectRatio = 1
    this.contentWidth = 0
    this.wrapper = React.createRef()
    this.content = React.createRef()
    this.handleScroll = this._handleScroll.bind(this)
    this.getDimension = this._getDimension.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.distanceFromTop = this.content.current.getBoundingClientRect().top
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    this.distanceFromTop = null
    this.aspectRatio = null
    this.contentWidth = null
  }

  _handleScroll(event) {
    const { isActive } = this.props
    if (isActive) {
      this.scroll()
    }
  }

  scroll(scrollTo) {
    const percentage = Math.min(
      (window.scrollY - this.distanceFromTop) /
        (this.contentWidth - window.innerHeight),
      1
    )
    this.content.current.style.transform = `translate(-${percentage *
      (this.contentWidth - window.innerWidth)}px, 0)`
  }

  _getDimension({ target: img }) {
    this.aspectRatio = img.offsetWidth / img.offsetHeight
    this.contentWidth = window.innerHeight * this.aspectRatio
    this.wrapper.current.style.height = `${this.contentWidth}px`
    this.content.current.style.width = `${this.contentWidth}px`
  }

  render() {
    const { isActive, verticalDirection, imgSrc } = this.props
    const content = <img src={imgSrc} onLoad={this.getDimension} />
    return (
      <Wrapper ref={this.wrapper}>
        <ScrollableComponent
          ref={this.content}
          isActive={isActive}
          alignBottom={verticalDirection === 'down'}
        >
          {content}
        </ScrollableComponent>
      </Wrapper>
    )
  }
}

export default withWaypoints(ScrollHorizontal)
