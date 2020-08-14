import Image from './zoomable-image'
import React from 'react'
import styled from 'styled-components'

const Article = styled.article`
  width: 40%;
  margin: 0 auto;
`

function TestComponent() {
  return (
    <Article>
      <h1>zoom-in demo</h1>
      <Image
        src="https://raw.githubusercontent.com/francoischalifour/medium-zoom/master/examples/react/public/images/image-1.jpg"
        alt="Zoom 1"
        caption="數年前在美國使用VRS手語視訊翻譯平台（Video Relay Service）後，難忘如此振奮的感覺，歐陽磊回台便創立洛以，全體員工都是聽障者。（攝影／張家瑋）"
      />
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
      <Image
        src="https://raw.githubusercontent.com/francoischalifour/medium-zoom/master/examples/react/public/images/image-2.jpg"
        alt="Zoom 1"
        caption="數年前在美國使用VRS手語視訊翻譯平台（Video Relay Service）後，難忘如此振奮的感覺，歐陽磊回台便創立洛以，全體員工都是聽障者。數年前在美國使用VRS手語視訊翻譯平台（Video Relay Service）後，難忘如此振奮的感覺，歐陽磊回台便創立洛以，全體員工都是聽障者。數年前在美國使用VRS手語視訊翻譯平台（Video Relay Service）後，難忘如此振奮的感覺，歐陽磊回台便創立洛以，全體員工都是聽障者。（攝影／張家瑋）"
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dolores
        quaerat, quis modi nostrum sequi adipisci ratione esse blanditiis error
        beatae vel non vero dolor nemo. Animi nemo quisquam ducimus!
      </p>
      <Image
        src="https://raw.githubusercontent.com/francoischalifour/medium-zoom/master/examples/react/public/images/image-3.jpg"
        alt="Zoom 1"
        caption="數年前在美國使用VRS手語視訊翻譯平台（Video Relay Service）後，難忘如此振奮的感覺，歐陽磊回台便創立洛以，全體員工都是聽障者。（攝影／張家瑋）"
      />
    </Article>
  )
}

export default TestComponent
