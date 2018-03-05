import { types as t } from 'mobx-state-tree'

import fetcher from '../utils/findMatches'

const Match = t
  .model('Match', {
    league: t.model({
      image: t.string,
      name: t.string
    }),
    link: t.string,
    time: t.string,
    home: t.string,
    away: t.string,
    streams: t.optional(t.array(t.string), [])
  })
  .actions(self => ({
    setStreams (streams) {
      self.streams = [...streams]
    }
  }))

export default t
  .model('FootballApp', {
    matches: t.optional(t.array(Match), [])
  })
  .actions(self => {
    function setMatches (matches) {
      self.matches = [...matches.map(x => Match.create(x))]
    }
    function findMatches () {
      fetcher(
        'https://mamahd.tv/football-live-streaming-online-for-free.html',
        self
      )
    }
    return { setMatches, findMatches }
  })
