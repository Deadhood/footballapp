import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import { observer } from 'mobx-react'

import './Matches.List.css'

const { Item } = List
const { Meta } = Item

class MatchesList extends Component {
  render () {
    return (
      <List
        itemLayout='horizontal'
        dataSource={this.props.matches}
        renderItem={item => (
          <Item onClick={item.getStreams}>
            <Meta
              avatar={
                <Avatar shape='square' size='large' src={item.league.image} />
              }
              title={`${item.home.name} vs ${item.away.name}`}
              description={item.time}
            />
          </Item>
        )}
      />
    )
  }
}

export default observer(MatchesList)
