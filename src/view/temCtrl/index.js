import React from 'react';
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'

import CardCom from './components/card'
import styles from './index.css'
import { fetchDevice, smartControl } from '../../actions/temCtrl-actions'


const TabPane = Tabs.TabPane
@connect(
    state => ({temCtrlState:state.toObject().temCtrlStore}),
    {
        fetchDevice, smartControl
    }
  )
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class TemCtrl extends React.Component {
    state = {  }

    componentDidMount() {
        const serverId = this.props.location.query.serverId
        this.props.fetchDevice({serverId: serverId})
    }

    deviceRender() {
        const { devices } = this.props.temCtrlState 
        const houseId = this.props.location.query.houseId
        
        if(devices.length === 1) {
          return devices.map((item,index) => 
          <CardCom 
            houseId={houseId}
            smartControl={this.props.smartControl}  
            data={item} 
            key={index}/>) 
        } else {
          return (
            <Tabs>
            {
              devices.map((item, index)=> (
                <TabPane tab={item.name} key={index} >
                  <CardCom data={item} houseId={houseId} smartControl={this.props.smartControl} />
                </TabPane>
            ))
            }
            </Tabs>
          ) 
        }
    }

    render() {
        console.log(this.props)
        return (
            <div styleName='temCtrl_bg' >
                {this.deviceRender()}
            </div>
        );
    }
}

export default TemCtrl;