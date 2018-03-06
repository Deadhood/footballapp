import cheerio from 'cheerio'
import { map, compose, uniq } from 'ramda'

const getlink = el => el.attr('href')
const uniqLinks = compose(uniq, map(getlink))

async function findStreams (link, cb) {
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const html = await window.fetch(cors + link).then(r => r.text())
  const $ = cheerio.load(html)
  const links = uniqLinks(
    $('.matches').find('a[rel=nofollow]').toArray().map($)
  )
  cb(links)
}

export default findStreams
