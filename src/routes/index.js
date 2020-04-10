import React from 'react'
import {Router, Route, IndexRoute } from 'react-router'

import Frame from '../layout/frame'
import Login from '../view/login/login'
import Light from '../view/light/light'
import ReadLight from '../view/readLight/readLight'
import DengDai from '../view/light/subpage/dengdai'
import Service from '../view/service/service'
import RoomCard from '../view/roomCard/roomCard'
import Models from '../view/models/models'
import Home from '../view/home/home'

//import Home from '../view/home/_home'
import Curtain from '../view/curtain/curtain'
import Tv from '../view/tv/tv'
import Air from '../view/air/air'
import SelectHome from '../view/selectHome/selectHome'
import ElevtorPage from '../view/elevtor/elevtor'
import TemCtrl from '../view/temCtrl'

import { getParam } from '../utlis'

const url = window.location.href
const LOGIN_IF = getParam(url, 'rmno') ? false : true
window.LOGIN_IF = LOGIN_IF

const routes = history => (
    <Router history={history}>
      <Route path='/' component={Frame}>
        <IndexRoute component={LOGIN_IF ? Login : Home}/>
        
        <Route path='light'>
            <IndexRoute component={Light}/>
            <Route path='dengdai' component={DengDai} />
            <Route path='readLight' component={ReadLight} />
        </Route>
        <Route path='/service' component={Service} />
        <Route path='/lock' component={RoomCard} />
        <Route path='/model' component={Models} />
        <Route path='/home' component={Home} />
        <Route path='/curtain' component={Curtain} />
        <Route path='/tv' component={Tv} />
        <Route path='/air' component={Air} />
        <Route path='/selectHome' component={ SelectHome } />
        <Route path='/elevtor' component={ ElevtorPage } />
        <Route path='/temCtrl' component={ TemCtrl } />
      </Route>
    </Router>
  )
export default routes