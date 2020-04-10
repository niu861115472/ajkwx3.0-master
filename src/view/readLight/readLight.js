import React from 'react';
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReadLightSwitch from './components/readLight-switch/readLightSwitch'
import ReadLightRange from './components/readLight-range/readLightRange'
import styles from './readLight.css'
import * as actions from '../../actions/readLight-actions'

@connect(
  (store) => ({readLightStore: store.toObject().readLightStore}),
  dispatch => ({readLightActions: bindActionCreators(actions, dispatch)})
)
@CSSModules(styles, { allowMultiple: true })
export default class ReadLight extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      '冷光': 50,
      '暖光': 50,
    }
  }
  componentDidMount() {
    this.props.readLightActions.getInitialState()
  }
  switchClick() {
    if (this.props.readLightStore.status === 'CLOSE') {
      this.props.readLightActions.switchClick('OPEN')
    } else {
      this.props.readLightActions.switchClick('CLOSE')
    }
    this.setState({
        '冷光': 50,
      '暖光': 50,
      })
  }
  rangeChange(wayId, e) {
    this.props.readLightActions.rangeChange(e.target.value, wayId)
  }
  rangeChange1(type, e) {
    this.setState({
        [type]: e.target.value
      })
  }
  lightRender() {
   return this.props.readLightStore.wayIds ? 
    this.props.readLightStore.wayIds.map(light => {
      return (
        <div styleName="switch" key={light.name}>
          <span styleName="switch_label">{light.name}</span>
          <ReadLightRange onChangefn={this.rangeChange.bind(this, light.wayId)}
          rangeChange1={this.rangeChange1.bind(this, light.name)}
          value={this.state[light.name]}/>
        </div>
      )
    })
   : null
  }
  render() {
    const { status } = this.props.readLightStore
    return (
      <div styleName='readLight_wrap'>
        <div styleName='blank1'></div>
        <ReadLightSwitch status={status} clickfn={this.switchClick.bind(this)}/>
        <div styleName='blank3'></div>
         {this.lightRender()}
      </div>
    );
  }
}
