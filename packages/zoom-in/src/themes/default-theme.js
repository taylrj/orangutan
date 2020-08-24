const defaultTheme = {
  image: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  overlay: {
    background: '#fff',
    opacity: 1,
    zIndex: 1,
  },
  caption: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.34,
    color: '#000',
    fontFamily: '',
    offset: 0,
  },
  zoomOptions: {
    scrollableEl: document,
    transitionDuration: 300,
    transitionFunction: 'cubic-bezier(0.2, 0, 0.2, 1)',
    scrollOffset: 30,
  },
}

export default defaultTheme
