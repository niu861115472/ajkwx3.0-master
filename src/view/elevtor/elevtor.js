import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './elevtor.css'
import { connect } from 'react-redux'
import { elevator,smartHostControl } from '../../actions/elevtor-actions'
import classnames from 'classnames'

@connect(
  state => ({elevtorStore: state.toObject().elevtorStore}),
  {
    elevator,smartHostControl
  }
)
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class ElevtorPage extends React.Component {
  state = {  }
  componentDidMount() {
    const hotelId = this.props.location.query.hotelId
    const floor = this.props.location.query.floor
    this.props.elevator({floor: floor,hotelId: hotelId})
  }
  elevtorRender = () =>  {
    const lists = this.props.elevtorStore.elevatorList
    return lists.map((elevtor,index) => {
      const styles = classnames({
        elevtor_item: true,
        active: this.state.activeIndex === index
      })
      return (
        <div key={elevtor.id} styleName={styles} onClick={() => this.elevatorHandle(elevtor, index)}>
          {
            this.state.activeIndex === index ? 
            <img src={require('../../assets/imgs/elevtor/elevtor_on.png')} alt=""/>
            : 
            <img src={require('../../assets/imgs/elevtor/elevtor_off.png')} alt=""/>
          }
          
          <span>{index + 1}</span>
        </div>
      )
    })
  }
  elevatorHandle = (data, index) => {
    this.setState({
      activeIndex: index 
    })
    if(!data.floors) return
    const floor = this.props.location.query.floor
    const floorData = data.floors.filter(elevator => elevator.floor=== floor)
    let floorx 
    if(floorData.length>0) {
       floorx = floorData[0].floorx
    } else {
      return 
    }
    this.props.smartHostControl({
      floor: floorx,
      deviceType: 'ELEVATOR',
      serverId: data.serverId
    })
  }
  render() {
    return (
      <div styleName='elevtor_bg'>
        <h2>选择电梯</h2>
        <div styleName="elevtor_wrap">
         {this.elevtorRender()}
        </div>
      </div>
    )
  }
}

export default ElevtorPage