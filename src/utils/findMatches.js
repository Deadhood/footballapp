import url from 'url'
import fecha from 'fecha'
import cheerio from 'cheerio'

if (!window.fetch) throw Error("Browser Doesn't support fetch")

export default async function findMatches (store) {
  const uri = 'https://mamahd.tv/football-live-streaming-online-for-free.html'
  const matches = await window
    .fetch('https://cors-anywhere.herokuapp.com/' + uri)
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
        const date = m
          .parent()
          .prevAll('div[style*=StreamHub]')
          .first()
          .find('h3')
          .text()
          .replace('Schedule for ', '')
          .replace(/th,/, '')
          .trim()
        const gmt1time = m.find('.digits').text().trim()
        const time = fecha.format(
          new Date(`${date} ${gmt1time} GMT`),
          'MMM Do, YYYY h:m A ZZ'
        )
        const link = m.attr('href').trim()
        const homeTeam = m.find('.description .home')
        const home = {
          name: homeTeam.find('span').text().trim(),
          image: url.resolve(uri, homeTeam.find('img').attr('src'))
        }
        const awayTeam = m.find('.description .away')
        const away = {
          name: awayTeam.find('span').text().trim(),
          image: url.resolve(uri, awayTeam.find('img').attr('src'))
        }
        return { league, link, time, home, away }
      })
    )
  store.setMatches(matches)
}
