import { types as t } from 'mobx-state-tree'

import fetcher from '../utils/findMatches'

const Team = t.model('Team', {
  name: t.string,
  image: t.string
})

const Match = t
  .model('Match', {
    league: t.model('League', {
      image: t.string,
      name: t.string
    }),
    link: t.string,
    time: t.string,
    home: Team,
    away: Team,
    streams: t.optional(t.array(t.string), [])
  })
  .actions(self => ({
    setStreams (streams) {
      self.streams = [...streams]
    }
  }))

const FootballApp = t
  .model('FootballApp', {
    matches: t.optional(t.array(Match), [])
  })
  .actions(self => ({
    setMatches (matches) {
      self.matches = [...matches.map(x => Match.create(x))]
    },
    findMatches () {
      fetcher(self)
    }
  }))

export default FootballApp
