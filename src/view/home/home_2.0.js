import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import styles from './home_2.0.css'
import * as homeActions from '../../actions/home-actions'
import * as roomCardActions from '../../actions/roomCard-actions'

import { elevator } from '../../actions/elevtor-actions'
import HomeEnvir from './components/home-envir/home-envir'
// import HomeName from './components/homeName'
import LockBtn from './components/lockBtn'
import Modal from './components/modal'

import { getParam } from '../../utlis'

@connect(
  state => ({
    idState:state.toObject().idStore, 
    homeState: state.toObject().homeStore,
    deviceId:state.toObject().roomCardStore.deviceId,
    elevatorIf: state.toObject().elevtorStore.elevatorIf
  }),
  dispatch => ({
    homeActions: bindActionCreators(homeActions, dispatch),
    roomCardActions: bindActionCreators(roomCardActions, dispatch),
    elevator: bindActionCreators(elevator,dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Home2 extends React.Component {
  constructor(){
    super()
    this.state = {
      activeIndex:-1,
      ifFirst: !localStorage.getItem('ifFirst'),
      modalVisible: false
    }
  }
  componentDidMount(){
    document.title = '爱居客智慧客控'
    // document.title = '宾智智慧客控'
    if(window.LOGIN_IF) {
      const houseId = this.props.location.query.houseId
      this.props.homeActions.saveHouseId(houseId)

      this.props.roomCardActions.initialState(houseId)
      
      const hotelId = this.props.location.query.hotelId
      const floor = this.props.location.query.floor
      this.props.elevator({floor: floor,hotelId: hotelId})

      this.setState({
        name: this.props.location.query.name,
        houseNo: this.props.location.query.houseNo
      })
    } else {
      const hotelCode = getParam(window.location.href, 'hotelCode')
      const rmno = getParam(window.location.href, 'rmno')
      this.props.homeActions.wzjwHouseInfo({
        hotelCode: hotelCode,
        rmno: rmno
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.name && nextProps.homeState.wzjHouseInfo) {
      this.setState({
        name: nextProps.homeState.wzjHouseInfo.name
      })
    }
    const hotelId = getParam(window.location.href, 'hotelId')
    if(hotelId) return
    if(nextProps.idState.houseId === '' && nextProps.homeState.wzjHouseInfo) {
      const {  hotelId, id} = nextProps.homeState.wzjHouseInfo
      sessionStorage.setItem('houseId', window.btoa(id))
      sessionStorage.setItem('hotelId', hotelId)
      sessionStorage.setItem('operate', 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ==')
      nextProps.homeActions.saveHouseId(id)
      
    }
  }

  figuresRender=()=>{
    let houseId, hotelId,serverId,houseNo
    if(this.props.homeState.wzjHouseInfo) {
       
      houseId = this.props.homeState.wzjHouseInfo.id
      hotelId = this.props.homeState.wzjHouseInfo.hotelId
      serverId = this.props.homeState.wzjHouseInfo.serverId
    } else {
       houseId = this.props.location.query.houseId
       hotelId = this.props.location.query.hotelId
       serverId = this.props.location.query.serverId
       houseNo = this.props.location.query.houseNo
    }
    let figures = [
      {name:'light',title:'灯',path:`light?houseId=${houseId}&serverId=${serverId}&houseNo=${houseNo}`},
      {name:'air',title:'空调',path:`air?houseId=${houseId}&serverId=${serverId}`},
      {name:'curtain',title:'窗帘',path:`curtain?houseId=${houseId}`},
      {name:'tv',title:'电视',path:`tv?houseId=${houseId}&serverId=${serverId}`},
      
      {name:'model',title:'情景',path:`model?houseId=${houseId}&houseNo=${houseNo}`},
      // {name:'service',title:'服务',path:`service?${this.props.location.search.slice(1)}`},
      // {name:'temCtrl',title:'温控',path:`temCtrl?serverId=${serverId}&houseId=${houseId}`},
   ]
   
   !window.LOGIN_IF ? figures : figures.pop()
   console.log(figures)
   figures = this.props.elevatorIf ? 
     [...figures,{name:'dianti',title:'电梯',path:`elevtor?hotelId=${hotelId}&floor=${this.props.location.query.floor}`}]
     : figures
     
   return figures.map((figure,index) => {
      const stylename = classNames({
            [figure.name]:true,
            home_figure:true,
            figure_active: this.state.activeIndex === index
           })
      return (
        <Link to={figure.path} key={figure.name} activeClassName='active'>
          <figure styleName={stylename} key={figure.name}  onClick={this.goDetail.bind(this,index,figure.path)}>
            <img src={require(`../../assets/imgs/home/${figure.name}.png`)} alt="" />
            <figcaption>{figure.title}</figcaption>
          </figure>
        </Link>
      )
   })
  }
  goDetail(index,path){
    this.setState({
      activeIndex:index
    })
  }
  modalClick = () => {
    this.setState({
      ifFirst: false,
      modalVisible: false
    })
    localStorage.setItem('ifFirst',1)
    this.props.roomCardActions.openTheDoor(this.props.deviceId)
  }
  openDoor = () => {
    if(this.state.ifFirst) {
      this.setState({
        modalVisible: true
      })
    }else {
    this.props.roomCardActions.openTheDoor(this.props.deviceId)
    }
  }
  render(){
    const {temp, pm, hum} = this.props.idState.envir
    const wzjNoAthority =  this.props.homeState.wzjNoAthority 
    return(  
      <div styleName='home_bg'>
            <div styleName={window.LOGIN_IF ? "top_item" :'wzg'}>
              {/* <HomeName name={ this.state.name }/> */}
            </div>
          <div styleName='content_box'>
            <HomeEnvir temp={temp} pm={pm} hum={hum} />
            <div styleName='lock_light'>
                <div styleName='temp'></div>
                <span styleName='title'>智控</span>
                {
                  window.LOGIN_IF ? 
                  <LockBtn openDoor={this.openDoor}></LockBtn>:
                  null
                }
            </div>
            
            <div styleName='figure_wrap' style={{marginTop: this.props.elevatorIf? '40px': '45px'}}>
              <div styleName='figures'>
                {
                  this.figuresRender()
                }
              </div>
            </div>
            {
              this.state.modalVisible?
               <div styleName='first_modal' onClick={this.modalClick}>
                 <img style={{width: '74.6%'}} src={require('../../assets/imgs/home/lock_gif.gif')} alt=''/>
                 <img onClick={this.modalClick} style={{marginTop: '30px', width: '40px'}} src={require('../../assets/imgs/home/close_icon.png')} alt=""/>
               </div>
               :null
            }
            {
              wzjNoAthority ?
              null :
              <Modal />
            }
         </div>
      </div>
    )
  }
}

export default Home2