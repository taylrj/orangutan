/* eslint no-console: 0 */
import Express from 'express'
import ZoomIn from '../src/index'
import path from 'path'
import webpackAssets from '../dist/webpack-assets.json'
import { mockData } from '../src/test-data/data'

function testEmbeddedCode(embeddedCode) {
  const app = new Express()
  app.use('/dist', Express.static(path.join(__dirname, '../dist')))
  app.get('/', (req, res) => {
    const html = `
      <!DOCTYPE html>
      <html lang="zh-Hant">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0,  user-scalable=no"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Test Document</title>
        </head>
        <body
          style="overflow-x:hidden;margin:0 auto;font-family: source-han-sans-traditional, Noto Sans TC, PingFang TC, Apple LiGothic Medium, Roboto, Microsoft JhengHei, Lucida Grande, Lucida Sans Unicode, sans-serif;width:50%;"
        >
          ${embeddedCode}
				</div>
        </body>
      </html>
    `
    res.send(html)
  })

  app.listen(3000, () => {
    console.log('You can test generated embedded code on localhost:3000')
  })
}
const config = {
  data: mockData,
}
const embeddedCode = ZoomIn.buildEmbeddedCode(config, webpackAssets)

testEmbeddedCode(embeddedCode)
