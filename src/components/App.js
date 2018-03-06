import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { inject, observer } from 'mobx-react'

import Matches from './Matches.List'

import './App.css'
const { Content, Header, Footer } = Layout

class App extends Component {
  render () {
    return (
      <Layout className='App'>
        <Header className='header'>FootballApp</Header>
        <Content className='content'>
          <Row>
            <Col span={Math.floor(24 / this.props.state.columns)}>
              <Matches matches={[...this.props.state.matches]} />
            </Col>
          </Row>
        </Content>
        <Footer className='footer'>Copyright © 2018 Deadhood</Footer>
      </Layout>
    )
  }

  componentDidMount () {
    if (this.props.state.matches.length < 1) {
      this.props.state.findMatches()
    }
  }
}

export default inject('state')(observer(App))
