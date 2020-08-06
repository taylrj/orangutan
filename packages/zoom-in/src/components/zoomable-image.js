import PropTypes from 'prop-types'
import React from 'react'
import Zoom from './zoom'
import styled from 'styled-components'

const Figure = styled.figure`
  margin: 0;
  flex: 1 0 280px;
  & > img {
    width: 100%;
    height: auto;
    display: block;
  }
  & > figcaption {
    font-size: 14px;
    text-align: right;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }
`

const ZoomableImage = props => {
  const { src, caption, alt } = props
  if (!src) return null
  return (
    <Figure>
      <Zoom
        options={{
          background: '#fff',
        }}
      >
        <img src={src} alt={alt} />
      </Zoom>
      <figcaption>{caption}</figcaption>
    </Figure>
  )
}

ZoomableImage.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string,
  alt: PropTypes.string,
}

ZoomableImage.defaultProps = {
  src: '',
  caption: '',
  alt: '',
}

export default ZoomableImage
