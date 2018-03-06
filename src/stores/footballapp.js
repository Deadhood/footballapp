import { types as t } from 'mobx-state-tree'

import matchFinder from '../utils/findMatches'
import streamFinder from '../utils/findStreams'

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
    },
    getStreams () {
      streamFinder(self.link, console.log)
    }
  }))

const FootballApp = t
  .model('FootballApp', {
    matches: t.optional(t.array(Match), []),
    columns: t.optional(t.number, 1)
  })
  .actions(self => ({
    setMatches (matches) {
      self.matches = [...matches.map(x => Match.create(x))]
    },
    findMatches () {
      matchFinder(self.setMatches)
    }
  }))

export default FootballApp
