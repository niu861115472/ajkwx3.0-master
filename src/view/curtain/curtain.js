import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'

import BlankPage from '../../components/blankPage'
import styles from './curtain.css'
import CurtainOne from './curtain-one'
import * as curtainActions from '../../actions/curtain-actions'
const TabPane = Tabs.TabPane

@connect(
  state => ({ curtainState: state.toObject().curtainStore }),
  dispatch => ({
    curtainActions: bindActionCreators(curtainActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Curtain extends React.PureComponent {
  constructor() {
    super()
    this.count = 0
    this.countActive = 0
  }
  componentDidMount() {
    const serverId = this.props.location.query.serverId
    console.log(serverId)
    this.props.curtainActions.initialCurtain(serverId)
    document.title = '窗'
  }

  curtainRender() {
    const { curtains, type } = this.props.curtainState
    const keys = Object.keys(curtains)

    const curtain = Object.values(curtains)
    console.log(Object.values(curtains),keys)
    // console.log(keys,curtain,type)
    if (keys.length === 0) {
      return <BlankPage src='curtain' title='无可控窗帘' titleColor='#5f71f1' />
    }
    if (keys.length > 1) {
      for (var x in keys) {
        if (keys[x] == '卫生') {
          keys[x] = '卫生间'
        }
      }
      console.log(keys)
      return (
        <Tabs swipeable={false}>
          {
            keys.map((key, index) => (
              <TabPane tab={key} key={index}>
                <CurtainOne curtain={curtain[index]} type={type} />
              </TabPane>
            ))
          }
        </Tabs>
      )
    } else {
      return (
        <CurtainOne type={type} curtain={curtains[keys[0]]} />
      )
    }
  }
  curtainRender1() {
    const { curtains, type } = this.props.curtainState
    const keys = ['卫生', '卧室']

    var curtain = Object.values(curtains)
    let arr = []
    var arr1 = curtain.filter(item => {
      return item.name.indexOf('卧室') > -1
    })
    var arr2 = curtain.filter(item => {
      return item.name.indexOf('卫生间') > -1
    })
    arr.push(arr2, arr1)
    curtain = arr

    if (keys.length === 0) {
      return <BlankPage src='curtain' title='无可控窗帘' titleColor='#5f71f1' />
    }
    if (keys.length > 1) {
      for (var x in keys) {
        if (keys[x] == '卫生') {
          keys[x] = '卫生间'
        }
      }
      console.log(keys)
      return (
        <Tabs swipeable={false}>
          {
            keys.map((key, index) => (
              <TabPane tab={key} key={index}>
                <CurtainOne curtain={curtain[index]} type={type} />
              </TabPane>
            ))
          }
        </Tabs>
      )
    } else {
      return (
        <CurtainOne type={type} curtain={curtains[keys[0]]} />
      )
    }
  }
  render() {
    return (
      <div styleName='curtain_bg'>
        {
          sessionStorage.getItem('source') == '1' ?
          this.curtainRender(): 
          this.curtainRender1()
        }
      </div>
    )
  }
}

export default Curtain