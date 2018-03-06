import url from 'url'
import fecha from 'fecha'
import cheerio from 'cheerio'
import {map, last, is, trim} from 'ramda'

const mapTrim = map(val => is(String, val) ? trim(val) : mapTrim(val))

async function findMatches (cb) {
  const uri = 'https://mamahd.tv/football-live-streaming-online-for-free.html'
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const html = await window.fetch(cors + uri).then(res => res.text())
  const $ = cheerio.load(html)
  const matches = $('.schedule a').toArray().map($).map(m => {
    const limg = m.find('.onlypc').next('div').find('img').attr('src')
    const lname = last(limg.split('/')).replace(/\..{3}$/, '')
    const league = {
      image: url.resolve(uri, limg),
      name: decodeURIComponent(lname)
    }

    const date = m
      .parent()
      .prevAll('div[style*=StreamHub]')
      .first()
      .find('h3')
      .text()
      .replace(/(Schedule\sfor\s)|(th,)/g, '')
    const gmt1time = m.find('.digits').text()
    const time = fecha.format(
      new Date(`${date} ${gmt1time} GMT`),
      'Do MMM YYYY h:m A ZZ'
    )

    const link = m.attr('href')
    const homeTeam = m.find('.description .home')
    const awayTeam = m.find('.description .away')

    const home = {
      name: homeTeam.find('span').text(),
      image: url.resolve(uri, homeTeam.find('img').attr('src'))
    }
    const away = {
      name: awayTeam.find('span').text(),
      image: url.resolve(uri, awayTeam.find('img').attr('src'))
    }

    return mapTrim({ league, link, time, home, away })
  })

  cb(matches)
}

export default findMatches
