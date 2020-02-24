import React from 'react'
import ScrollHorizontal from './scroll-horizontal'
import styled from 'styled-components'

const FullPage1 = styled.div`
  width: 100%;
  height: 200vh;
  background: brown;
`

const FullPage2 = styled.div`
  width: 100%;
  height: 100vh;
  background: green;
`

export default class TestComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
  }

  render() {
    const componentWithWaypoint = (
      <>
        <FullPage1 />
        <ScrollHorizontal imgSrc="https://static01.nyt.com/newsgraphics/2016/08/14/men-100-meters-bolt-horizontal/09c0dfe010da583c01f23709a11f6153e10cbb7b/bolt-100m-race-a3698x450.jpg" />
        <FullPage2 />
      </>
    )
    return <>{componentWithWaypoint}</>
  }
}
