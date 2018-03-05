import React from 'react'
import { render } from 'react-dom'

import url from 'url'
import cheerio from 'cheerio'
import { Provider } from 'mobx-react'

import App from './App'
import Store from './store'

import './index.css'

if (!window.fetch) throw Error("Browser Doesn't support fetch")

const fBall = 'https://cors-anywhere.herokuapp.com/https://mamahd.tv/football-live-streaming-online-for-free.html'
const footballApp = Store.create()

async function findMatches (uri) {
  const matches = await window
    .fetch(uri)
    .then(res => res.text())
    .then(cheerio.load)
    .then($ =>
      $('.schedule a').toArray().map($).map(m => {
        const limg = m.find('.onlypc').next('div').find('img').attr('src')
        const lname = limg.split('/').slice(-1)[0].replace(/\..{3}$/, '')
        const league = {
          image: url.resolve(uri, limg),
          name: decodeURIComponent(lname)
        }
        const link = m.attr('href').trim()
        const time = m.find('.digits').text().trim()
        const home = m.find('.description .home span').text().trim()
        const away = m.find('.description .away span').text().trim()
        return { league, link, time, home, away }
      })
    )
  footballApp.setMatches(matches)
}

findMatches(fBall)

const rRender = () =>
  render(
    <Provider store={footballApp}>
      <App />
    </Provider>,
    document.querySelector('#root')
  )

rRender()

if (module.hot) module.hot.accept(rRender)
