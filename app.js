const url = require('url')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

const fBall = 'https://mamahd.tv/football-live-streaming-online-for-free.html'

async function getMatches (uri) {
  const matches = await fetch(uri)
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
  console.log(matches)
}

getMatches(fBall)
