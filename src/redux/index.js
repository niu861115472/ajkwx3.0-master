import {
  combineReducers
} from 'redux-immutable';

import idStore from './id-reducer'
import loginStore from './login-reducer'
import lightStore from './light-reducer'
import airStore from './air-reducer'
import roomCardStore from './roomCard-reducer'
import serviceStore from './service-reducer'
import modelStore from './model-reducer'
import tvStore from './tv-reducer'
import curtainStore from './curtain-reducer'
import selectHomeStore from './selectHome-reducer'
import readLightStore from './readLight-reducer'
import homeStore from './home-reducer'
import elevtorStore from './elevtor-reducer'
import temCtrlStore from './temCtrl.reducer'

export default combineReducers({
  loginStore, 
  elevtorStore,
  selectHomeStore, 
  lightStore,
  airStore,
  idStore,
  roomCardStore,
  serviceStore,
  modelStore,
  tvStore,
  curtainStore,
  readLightStore,
  temCtrlStore,
  homeStore})