import { types as t } from 'mobx-state-tree'

const Match = t.model('Match', {
  league: t.model({
    image: t.string,
    name: t.string
  }),
  link: t.string,
  time: t.string,
  home: t.string,
  away: t.string
})

export default t
  .model('FootballApp', {
    matches: t.optional(t.array(Match), [])
  })
  .actions(self => {
    function setMatches (matches) {
      const m = matches.map(x => Match.create(x))
      self.matches.splice(0, self.matches.length, ...m)
    }
    return { setMatches }
  })
