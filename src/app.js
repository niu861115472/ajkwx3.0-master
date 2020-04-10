import ReactDOM from 'react-dom'
import React from 'react'
import { hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import initReactFastclick from 'react-fastclick'
import Immutable from 'immutable'

import configureStore from './store'
import routes from './routes'
import './assets/normalize.css'
import './app.css'

const initialState = Immutable.Map();

const store = configureStore(initialState)
const history = hashHistory

initReactFastclick()
ReactDOM.render(
  <Provider store={store}>
    { routes(history) }
  </Provider>
,document.getElementById('root'))