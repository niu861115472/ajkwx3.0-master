import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Modal } from 'antd-mobile'
import styles from './service.css'
import * as serviceActions from '../../actions/service-actions'
const alert = Modal.alert

@connect(
  state => ({serviceState:state.toObject().serviceStore}),
  dispatch => ({
    serviceActions: bindActionCreators(serviceActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Service extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      status: '',
      clean: sessionStorage.getItem('cleanState'),
      disturb: sessionStorage.getItem('disturbState')
    }
  }
  componentDidMount(){
    document.title = '服务'
    this.props.serviceActions.initailState()
    console.log(this.props.serviceState)
  }
  submitService(type){
    const { lights } = this.props.serviceState
    this.setState({
      status:type,
    },function(){
      
      const status = this.state[this.state.status] === 'CLOSE' ? 'OPEN' : 'CLOSE'
      // const status1 = this.state[this.state.status] === 'OFF' ? 
      // sessionStorage.setItem('cleanState',status)
      // sessionStorage.setItem('disturbState',status)
      const ohtherStatus = type === 'clean' ? 'disturb' : 'clean' 
      this.setState({
        [this.state.status]: status,
        [ohtherStatus]: 'CLOSE'
      })
      if (type==='clean') {
        const cleanlight = lights.filter(light => light.name === "请即清理")
        console.log(this.state.clean)
        sessionStorage.setItem('cleanState',this.state.clean)
        this.props.serviceActions.submitService(cleanlight[0].wayId,status)
      }
      if (type==='disturb') {
        const cleanlight = lights.filter(light => light.name === "请勿打扰")
        console.log(this.state.disturb)
        sessionStorage.setItem('disturbState',this.state.disturb)
        // console.log(this.state.disturb)
        this.props.serviceActions.submitService(cleanlight[0].wayId,status)
        
      }
    })
  }
  checkout = () => {
    this.props.history.replace('/')
    const query = this.props.location.query
    this.props.serviceActions.checkout({
      houseName: encodeURI(query.name),
      [query.subOrderCode?'subOrderCode':'recordId']: query.subOrderCode?query.subOrderCode:query.recordId
    })
    this.setState({
      status: 'checkout'
    })
  }
  propmtVisit = ()=> {
    alert('退房', '确定退房么?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => this.checkout() },
    ])
  }
  render() {
    console.log(sessionStorage.getItem('cleanState'),sessionStorage.getItem('disturbState'))
    const cleanStyle = classNames({
      service_item:true,
      // active:(sessionStorage.getItem('cleanState')=='OPEN')?true:false
    })
     const disturbStyle = classNames({
      service_item:true,
      // active:(sessionStorage.getItem('disturbState')=='OPEN')?true:false
    })
    const checkoutStyle = classNames({
      service_item:true,
      active:this.state.status!=='checkout'?false:true
    })
    return (
      <div styleName='service_bg'>
       <div styleName='title'>
         <h3>HOTEL SERVICE</h3>
         <h4>酒店一站式服务</h4>
       </div>
        <div styleName='rect' >
          <div styleName={cleanStyle}  onClick={this.submitService.bind(this,'clean')} >
            {
              this.state.clean =='OPEN'?
              <img src={require('../../assets/imgs/service/swape.png')} alt="" styleName='swape'/>:
              <img src={require('../../assets/imgs/service/swape_off.png')} alt="" styleName='swape'/>
            }
            <p styleName='content' style={{color:this.state.clean =='OPEN'?'#63a0cb':'#666'}}>请即清理</p>
           
          </div>
          <div styleName={disturbStyle} onClick={this.submitService.bind(this,'disturb')}>
            {
              this.state.disturb =='OPEN'?
              <img src={require('../../assets/imgs/service/ring.png')} alt="" styleName='ring'/>:
              <img src={require('../../assets/imgs/service/ring_off.png')} alt="" styleName='ring'/>
            }
            <p styleName='content' style={{color:this.state.disturb =='OPEN'?'#f6b354':'#666'}}>请勿打扰</p>
          </div>
          {
            window.LOGIN_IF ? 
            <div styleName={checkoutStyle}  onClick={this.propmtVisit}>
              {
                this.state.status === 'checkout'?
                <img src={require('../../assets/imgs/service/checkout.png')} alt="" styleName='swape'/>:
                <img src={require('../../assets/imgs/service/checkout_off.png')} alt="" styleName='swape'/>
              }
              <p styleName='content' style={{color:this.state.status === 'checkout'?'#87b221':'#666'}}>退房</p>
            </div> : null
          }
        </div>
      </div>
    )
  }
}

export default Service