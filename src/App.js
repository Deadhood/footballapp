import React, { Component } from 'react'
import { Layout } from 'antd'

import './App.css'
const { Content, Header, Footer } = Layout

class App extends Component {
  render () {
    return (
      <Layout className='App'>
        <Header className='header'>FootballApp</Header>
        <Content className='content'>
          <h1>HI</h1>
        </Content>
        <Footer className='footer'>Copyright &copy; 2018 Deadhood</Footer>
      </Layout>
    )
  }
}

export default App
