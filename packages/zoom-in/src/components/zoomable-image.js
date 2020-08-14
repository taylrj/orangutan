import PropTypes from 'prop-types'
import React from 'react'
import Zoom from './zoom'
import styled, { ThemeProvider } from 'styled-components'
import merge from 'lodash/merge'

const _ = {
  merge,
}

const Figure = styled.figure`
  margin: 0;
  flex: 1 0 280px;
  & > img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const OriginalCaption = styled.figcaption`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.34px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`

const defaultTheme = {
  // image: {
  marginTop: 32,
  marginLeft: 42,
  marginRight: 42,
  marginBottom: 15,
  // }
  // overlay: {
  background: '#fff',
  opacity: 1,
  overlayZindex: 1,
  // }
  // caption:{
  captionPosition: 'bottom', // top, right, bottom, left
  captionAlign: 'left', // left or right; top or bottom
  captionOffset: 0,
  captionFontSize: 12,
  captionLineHeight: 18,
  captionLetterSpacing: 0.34,
  captionColor: '#000',
  captionMarginBottom: 24,
  captionWidth: 578,
  // TODO
  captionFont: '',
  // }
  frame: {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}

const ZoomableImage = ({ src, caption, alt, theme }) => {
  // TODO: make twreporter style's OriginalCaption
  if (!src) return null
  return (
    <ThemeProvider theme={_.merge({}, defaultTheme, theme)}>
      <Figure>
        <Zoom caption={caption}>
          <img src={src} alt={alt} />
        </Zoom>
        <OriginalCaption>{caption}</OriginalCaption>
      </Figure>
    </ThemeProvider>
  )
}

ZoomableImage.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string,
  alt: PropTypes.string,
  // TODO: to be defined
  theme: PropTypes.object,
}

ZoomableImage.defaultProps = {
  src: '',
  caption: '',
  alt: '',
  theme: null,
}

export default ZoomableImage
