import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'

import styles from './roomCard.css'
import * as roomCardActions from '../../actions/roomCard-actions'

import FabFan from '../../components/react-action-button/action-button'



@connect(
  state => ({roomCardState:state.toObject().roomCardStore}),
  dispatch => ({
    roomCardActions: bindActionCreators(roomCardActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class RoomCard extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      actvieIndex:-1,
      open: false,
    }
  }
  componentDidMount(){
    const { floor, hotelId } = this.props.location.query
    const houseId = this.props.location.query.houseId
    this.props.roomCardActions.initialState(houseId)
    this.props.roomCardActions.elevator({floor: floor,hotelId: hotelId})
    document.title = '房卡'
  }
  figureRender(){
    const { actvieIndex } = this.state
    const arrys = [{title: '断电' ,name: 'source'},{title: '门' ,name: 'door'}]
    return arrys.map((arry,index) => {
        const style = classNames({
          figure:true,
          [`figure_${arry.name}`]: true,
          active:index === actvieIndex
        })
        let dsf = index !== actvieIndex ? <img src={require(`../../assets/imgs/roomCard/${arry.name}.png`)} alt=""/>:
                    <img src={require(`../../assets/imgs/roomCard/${arry.name}_active.png`)} alt=""/>
        return <div styleName={style} key={arry.name} onClick={this.click.bind(this,index,arry.name)}>
                <div>
                  { dsf }            
                </div>
                <p styleName='selectTitle'>{arry.title}</p>
              </div>
      
    })
  }
  click(index,type) {
    this.setState({actvieIndex:index})
    if(type === 'door') {
      this.props.roomCardActions.openTheDoor(this.props.roomCardState.deviceId)
    }
    if (type === 'elevator') {
      this.props.roomCardActions.elevator(this.props.location.query.floor, this.props.location.query.hotelId)
    }
    if (type === 'source') {
      this.props.roomCardActions.source()
    }
  }
  toggleActionBar = () => {
    this.setState(state => {
      return {
        open: !state.open
      }
    })
  }
  elevatorHandle = (data) => {
    if(!data.floors) return
    const floor = this.props.location.query.floor
    const floorData = data.floors.filter(elevator => elevator.floor=== floor)
    let floorx 
    if(floorData.length>0) {
       floorx = floorData[0].floorx
    } else {
      return 
    }
    this.props.roomCardActions.smartHostControl({
      floor: floorx,
      deviceType: 'ELEVATOR',
      serverId: data.serverId
    })
  }
  render(){
    const {open} = this.state
    const roomName = this.props.location.query.name
    const roomName_num = roomName.replace(/[^0-9]/ig,"")
    const roomName_hotel = roomName.replace(/[0-9]/ig,"")
    return(
      <div styleName='roomCard_bg'> 
        <div styleName='round_bg'>
          {this.figureRender()}
          <div styleName='center'>
            <p styleName='center_name'>{roomName_hotel}</p>
            <p styleName='center_num'>{roomName_num}</p>
          </div>
          <img src={require('../../assets/imgs/roomCard/pots.png')} styleName='pots_top' alt=""/>
          {
            this.props.roomCardState.elevatorList.length > 0?
            <FabFan
              open={open}
              options={this.props.roomCardState.elevatorList}
              onClick={this.toggleActionBar}
              itemClick={this.elevatorHandle}
              actionContainerStyle={{
                width: '50px',
                position: 'relative',
                right: '5px',
                bottom: '15px'
              }}
            />:null
          }
        </div>
        
      </div>
    )
  }
}

export default RoomCard