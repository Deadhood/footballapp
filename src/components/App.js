import React, { Component } from 'react'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'

import './App.css'
const { Content, Header, Footer } = Layout

class App extends Component {
  render () {
    return (
      <Layout className='App'>
        <Header className='header'>FootballApp</Header>
        <Content className='content'>
          <h1>Content goes here</h1>
        </Content>
        <Footer className='footer'>Copyright © 2018 Deadhood</Footer>
      </Layout>
    )
  }

  componentDidMount () {
    if (this.props.state.matches.length < 1) {
      this.props.state.findMatches()
      console.log(this.props.state)
    }
  }
}

export default inject('state')(observer(App))
