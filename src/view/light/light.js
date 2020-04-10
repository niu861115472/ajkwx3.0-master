import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './light.css'
import * as actions from '../../actions/light-actions'
import LightTab from './component/ligthTab'
import LightCard from './component/lightCard'
import DengDai from './subpage/dengdai'
import { config, config_wz } from '../../utlis' 


@connect(
  state => ({lightStore:state.toObject().lightStore,idStore:state.toObject().idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Light extends React.PureComponent {
  constructor(props) {
    
    super(props)
    this.state = {
    modelActiveIndex:-1,
    switchStatus: false
    //largeRoundShouldReset: false
    } 
  }
  componentDidMount(){
    document.title = '灯'
    // const source = sessionStorage.getItem('source')
    const roomId = this.props.location.query.serverId
    this.props.lightActions.initialLights({
      serverId: this.props.location.query.serverId,
      houseId: this.props.location.query.houseId,
      houseNo:this.props.location.query.houseNo
    },roomId)
    if(sessionStorage.getItem('source') == '1'){
      this.props.lightActions.yuedudeng({
        houseId: this.props.location.query.houseId
      })
    }
    const _config = window.LOGIN_IF ? config: config_wz
    const pre = window.LOGIN_IF ? 'ws' : 'wss'
    this.websocketA = new WebSocket(`${pre}://${_config.api.websocketA}/stServlet.st?serverId=` + this.props.location.query.serverId)
    this.websocketB = new WebSocket(`${pre}://${_config.api.websocketB}/stServlet.st?serverId=` + this.props.location.query.serverId)  
    this.websocketA.onopen = () => {
      console.log('websocketA已链接')
    }
    this.websocketA.onmessage = (event) => {
      let lights = this.props.lightStore.lights
      const lightNow = event.data.split('.WAY.')
      const changelihts = lights.map((light, index) => {
        if(light.id === lightNow[0]) {
          return {...light, status: lightNow[1]}
        }else {
          return light
        }
      })
      this.props.lightActions.getLightsWays(changelihts)
     }
     // webcoketB
     this.websocketB.onopen = () => {
      console.log('websocketB已链接')
    }
    this.websocketB.onmessage = (event) => {
      let lights = this.props.lightStore.lights
      const lightNow = event.data.split('.WAY.')
      const changelihts = lights.map((light, index) => {
        if(light.id === lightNow[0]) {
          return {...light, status: lightNow[1]}
        }else {
          return light
        }
      })
      this.props.lightActions.getLightsWays(changelihts)
     }
     
  }
  
  componentWillReceiveProps(nextProps) {
    this.changeToiletSwitchStatus(nextProps) 
  }
  
  componentWillUnmount() {
    this.websocketA.close()
  }
 // 改变卫生间全开全关状态 
  changeToiletSwitchStatus = (nextProps) => {
    console.log(nextProps.lightStore)
    const {lights,middleRoundStatus} = nextProps.lightStore
   if(middleRoundStatus === '卫生间') {
    let allOn = true
      lights
      .filter((light) => light.name&&light.name.indexOf(middleRoundStatus) > -1)
      .forEach(light => {
        if(light.status === 'OFF') {
          allOn = false
        }
      })
      this.setState({
        switchStatus: allOn
      })
    } 
  }

  middelRoundClick = (type) => {
    this.props.lightActions.changeMiddleStatus(type)
  }
  lightSelector = () => {
    const {lights,middleRoundStatus} = this.props.lightStore
    console.log(this.props.lightStore)
    return lights
    .filter((light) => light.name&&light.name.indexOf(middleRoundStatus) > -1)
  }
  switchChange = (e) => {
    this.setState({
      switchStatus: !this.state.switchStatus
    })
    const {lights,middleRoundStatus} = this.props.lightStore
     lights
    .filter((light) => light.name&&light.name.indexOf(middleRoundStatus) > -1)
    .forEach(light => {
      this.props.lightActions.lightsClick(light.id, e?'OFF':'ON',light.deviceId,light.openStatus=='0'?'open':'close')
      console.log(light.deviceId)
    })
  }
  render() {
    const { middleRoundStatus} = this.props.lightStore
    
    return (
      <div styleName='light_bg' >
        <LightTab 
          type={middleRoundStatus}
          middelRoundClick={this.middelRoundClick}
        />
          <LightCard 
          type={middleRoundStatus}
          lights={this.lightSelector()}
          switchChange={this.switchChange}
          switchStatus={this.state.switchStatus}
        />
        
      </div>
    )
  }
}

export default Light