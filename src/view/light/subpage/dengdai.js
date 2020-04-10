import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './dengdai.css'
import * as readLightActions from '../../../actions/dengdai-actions'

@connect(
  state => ({}),
  dispatch => ({
    readLightActions: bindActionCreators(readLightActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class DengDai extends React.PureComponent {
   constructor() {
     super()
     this.state = {
        activeIndex_1: -1,
        activeIndex_2: -1
       }
   }
   btnClick(index, type, key) {
      const otherType = type.slice(-1) === '1' ? 'activeIndex_2' : 'activeIndex_1'
     this.setState({
       [type]: index,
       [otherType]: -1
     })
     const deviceId = this.props.location.query.deviceId
     this.props.readLightActions.rgbClick(deviceId, key)
   }
   btnsRender(colors, type) {
      return colors.map((color, index) => {
        const classSytle = classNames({
          btn: true,
          active: this.state[type] === index,
          [color]: true
        })
        const key = color.slice(0,1)
        return <div key={ index } styleName={classSytle} style={{background: color}} onClick={this.btnClick.bind(this, index, type, key)}>
          <img styleName="img" src={require('../../../assets/imgs/light/check.png')} alt=""/>
        </div>
      })
    }
  render() {
    const deviceId = this.props.location.query.deviceId
    console.log(deviceId)
    return (
      <div styleName='yududeng_wrap'>
        <div styleName="row">
          {this.btnsRender(['red','green','blue','white'], 'activeIndex_1')}
        </div>
        <div styleName="close_btn" onClick={()=>this.props.readLightActions.rgbClick(deviceId, 'OFF')}>OFF</div>
        <div styleName="row">
          {this.btnsRender(['yellow','pink','cornflowerblue','orange'], 'activeIndex_2')}
        </div>
      </div>
    )
  }
}

export default DengDai