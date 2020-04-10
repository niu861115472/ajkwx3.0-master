import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'

import styles from './tv.css'
import * as tvActions from '../../actions/tv-actions'

import TvOne from './tv-one'
import SwipeType from '../../components/swipeTypeHoc/SwipeType'
import BlankPage from '../../components/blankPage'

const TabPane = Tabs.TabPane

@connect(
  state => ({tvState:state.toObject().tvStore}),
  dispatch => ({
    tvActions: bindActionCreators(tvActions, dispatch),
  })
)
@SwipeType
@CSSModules(styles, { allowMultiple: true })
class Tv extends React.PureComponent {
  constructor() {
    super()
    this.count = 0 
    this.countActive = 0
  }
  componentDidMount(){
    const serverId = this.props.location.query.serverId
    this.props.tvActions.initialTv(serverId)
    this.props.componentDidMount()
    const { tvs } = this.props.tvState
    document.title = '电视' 
    window.addEventListener("orientationchange", function (e) {
      e.preventDefault();

  }, false);
  }


  tvRender() {
    const { tvs } = this.props.tvState 
    if(tvs.length === 0) {
      return <BlankPage src='tv' title='无可控电视机' />
    }
    if(tvs.length === 1) {
      return tvs.map((tv,index) => <TvOne  tvSwitch={this.props.tvState.tvSwitch}  tv={tv} actions={this.props.tvActions} key={index}/>) 
    } else {
      return (
        <Tabs>
        {
          tvs.map((tv, index)=> (
            <TabPane tab={Object.keys(tv)[0]} key={index} >
              <TvOne  tvSwitch={this.props.tvState.tvSwitch}  tv={tv} actions={this.props.tvActions}/>
            </TabPane>
        ))
        }
        </Tabs>
      ) 
    }
  }
  render(){
    return (
      <div styleName='tv_bg'>
        <div styleName="tvwrap clearfix"  
          >
         {this.tvRender()}
        </div>
      </div>
    )
  }
}

export default Tv