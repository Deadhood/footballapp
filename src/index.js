import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import App from './components/App'
import appStore from './stores/footballapp'

import './index.css'

render(
  <Provider state={appStore.create()}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
