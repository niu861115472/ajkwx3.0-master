import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'

import styles from './air.css'
import AirOne from './air-one'
import * as airActions from '../../actions/air-actions'

const TabPane = Tabs.TabPane

@connect(
  state => ({airState:state.toObject().airStore}),
  dispatch => ({
    airActions: bindActionCreators(airActions, dispatch),
  })
)

@CSSModules(styles, { allowMultiple: true })
class Air extends React.PureComponent {
  constructor() {
    super()
    this.count = 0 
    this.countActive = 0
  }
  
  componentDidMount(){
    
    const houseNo = this.props.location.query.houseNo
    console.log(this.props.location.query.serverId)
    this.props.airActions.initialAirCondition(this.props.location.query.serverId,this.props.location.query.serverId) 
    const { airs } = this.props.airState
    if (airs.length > 0) {
      document.title = '空调'
      //Object.keys(airs[this.countActive])[0].replace(/[0-9$]/g, '')
    }
  }

  render(){
    const {airs,deviceType} = this.props.airState
    const name = this.props.location.query.name
    
    var arry = []
    for(const item of airs){
      const regNumber = /\d+/;
      if(regNumber.test(item.name)){
        var arry = airs.filter((item) => (item.name.indexOf(name) == 0))
      }
      else{
        var arry = airs
      }
    }
    console.log(arry)
    return(
      <div styleName='air_bg'>
        {
          arry.length === 1 ?arry.map((air,index) => <AirOne key={index} deviceType={deviceType} air={air} actions={this.props.airActions}/>):
          <Tabs>
            {
              arry.map((air)=> (
                <TabPane tab={air.name} key={air.deviceId} >
                  <AirOne  deviceType={deviceType} air={air} actions={this.props.airActions}/>
                </TabPane>
            ))
            }
          </Tabs>       
        }
      </div>
      
    )
  }
}

export default Air