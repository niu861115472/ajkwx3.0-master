import React from 'react'
import styles from '../light.css'
import { Switch } from 'antd-mobile'
import classNames from 'classnames'
import { hashHistory } from "react-router"
import CSSModules from 'react-css-modules'
import DengDai from '../subpage/dengdai'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions/light-actions'

// const source = sessionStorage.getItem('source')

@connect(
  state => ({ lightStore: state.toObject().lightStore, idStore: state.toObject().idStore }),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class LightCard extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  lightRender = () => {

    if (this.props.lights.length === 0) {

      return (
        <div styleName="blank_wrap">
          <img styleName='blank_img' src={require('../../../assets/imgs/light/nolight.png')} alt="" />
          <span>无此类型的灯</span>
        </div>
      )

    } else {
      return this.props.lights.map((light,index) => {

        const status = sessionStorage.getItem('source') == '1' ? light.status : (light.status == '0' ? 'OFF' : 'ON')
        // const status = light.status
        const stylename = classNames({ lights: true, ['lights_' + status]: true, [light.name + '_' + status]: true })
        console.log(this.props.lights, status)
        const lightName1 = light.name.replace(this.props.lightStore.middleRoundStatus, '')
        const lightName2 = lightName1.replace('-', '');
        const lightName3 = lightName2.replace(/\d+/g, '')
        return (
          <div styleName='light_wrap' key={light.deviceId}>
            <div className={stylename}
              onClick={this.lightsClick.bind(this, light.id, status,index, light.name, light.deviceId)}>
              <div styleName="light_img"></div>
              <p styleName='light_p'>{lightName3}</p>
            </div>
          </div>
        )
      })
    }
  }
  lightsClick = (wayId, status,index, name, deviceId) => {
    const { lights } = this.props
    if (name.indexOf('可调灯带灯') > -1) {
      hashHistory.push(`light/dengdai?deviceId=${deviceId}`)
      return
    }
    if (name.indexOf('可调筒灯') > -1) {
      hashHistory.push(`light/readLight?deviceId=${deviceId}`)
      return
    }

    // lights.forEach((light, index) => {
    // if (light.id === wayId || light.deviceId == deviceId) {
      this.props.lightActions.lightsClick(wayId, status, deviceId)
      lights[index].status = !lights[index].status
    // }
    // })
  }
  render() {
    return (
      <div className={styles.light_card}>
        <div styleName='ligths_wrap'>
          {this.lightRender()}
        </div>
        {
          this.props.type === '卫生间' && this.props.lights.length >= 0 ?
            <div className={styles.switch_toggle}>
              <div>全关</div>
              <Switch checked={this.props.switchStatus} onChange={this.props.switchChange}></Switch>
              <div>全开</div>
            </div> : null
        }

      </div>
    )
  }
}

export default LightCard
