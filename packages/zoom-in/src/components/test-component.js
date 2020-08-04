import React from 'react'
import Zoom from './zoom'
import styled from 'styled-components'

const Article = styled.article`
  width: 40%;
  margin: 0 auto;
`

function TestComponent() {
  return (
    <Article>
      <h1>zoom-in demo</h1>
      <Zoom
        options={{
          background: '#fff',
        }}
      >
        <img
          src="https://raw.githubusercontent.com/francoischalifour/medium-zoom/master/examples/react/public/images/image-1.jpg"
          alt="Zoom 1"
        />
      </Zoom>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
        praesentium cupiditate fugit voluptas, rem eligendi, voluptatem
        molestias. Doloremque sit voluptatum odio maiores provident consequuntur
        accusantium saepe.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
        praesentium cupiditate fugit voluptas, rem eligendi, voluptatem
        molestias. Doloremque sit voluptatum odio maiores provident consequuntur
        accusantium saepe.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
        praesentium cupiditate fugit voluptas, rem eligendi, voluptatem
        molestias. Doloremque sit voluptatum odio maiores provident consequuntur
        accusantium saepe.
      </p>
      <Zoom
        options={{
          background: '#000',
        }}
      >
        <img
          src="https://raw.githubusercontent.com/francoischalifour/medium-zoom/master/examples/react/public/images/image-2.jpg"
          alt="Zoom 2"
        />
      </Zoom>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dolores
        quaerat, quis modi nostrum sequi adipisci ratione esse blanditiis error
        beatae vel non vero dolor nemo. Animi nemo quisquam ducimus!
      </p>
      <Zoom
        options={{
          background: 'red',
        }}
      >
        <img
          src="https://raw.githubusercontent.com/francoischalifour/medium-zoom/master/examples/react/public/images/image-3.jpg"
          alt="Zoom 3"
        />
      </Zoom>
    </Article>
  )
}

export default TestComponent
