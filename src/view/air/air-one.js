import React from 'react'
import CSSModules from 'react-css-modules'


import styles from './air.css'


@CSSModules(styles, { allowMultiple: true })
class AirOne extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      speed:3,
      switchKey:'ON',
      temIndex:-1,
      currentTemArray:[],
      model:'cold'
    }
  }
  componentDidMount(){
    this.setState({
      currentTemArray:this.props.air.coolWays,
      switchKey: this.props.air.switchStatus === 'ON' ? 'OFF' : 'ON',
      temIndex: Math.floor(this.props.air.coolWays.length / 2),
    })
  }
 
  //开关
  switchClick(deviceId){
    const key = this.state.switchKey === 'ON'?'OFF':'ON'
    if (key === 'ON') {
      this.props.actions.airswitch('OFF',deviceId,'close')
      this.setState({
      switchKey:key,
      temIndex:0
      })
    }else{
      const {coolWays} = this.props.air
      const temIndex =  Math.round(coolWays.length/2)
      
      this.props.actions.airswitch(coolWays[temIndex],deviceId,'open')
      this.setState({
      switchKey:key,
      temIndex:temIndex
    })
    console.log(temIndex)
    }
  }
  //温度加减
  temChange(type,deviceId){
    if(this.state.switchKey === 'ON') return
    if (this.props.deviceType === 'VIRTUAL_AIR_REMOTE'){
        const index = type === 'plus'?(this.state.temIndex+1 >=this.state.currentTemArray.length?this.state.temIndex:this.state.temIndex+1):
                                      (this.state.temIndex-1 >= 0?this.state.temIndex-1:0)
        this.setState({
          temIndex:index,
          switchKey:'OFF'
        },function(){
          this.props.actions.changeTem(this.state.currentTemArray[this.state.temIndex],deviceId)
        })
      
    }

    if(this.props.deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE' || this.props.deviceType === 'AIR-CONDITIONER'){
        const index = type === 'plus'?(this.state.temIndex+1 >=this.state.currentTemArray.length?this.state.temIndex:this.state.temIndex+1):
                                   (this.state.temIndex-1 > 0?this.state.temIndex-1: 0)
        this.setState({
          temIndex:index,
          switchKey:'OFF'
        },function(){
          this.props.actions.centerchangeTem(this.state.currentTemArray[this.state.temIndex],deviceId,this.state.model,this.state.speed,'TEMPERATURE',this.state.currentTemArray[this.state.temIndex])
        })
    }
  }
  //风速改变
  speedChange(deviceId){
    if(this.state.switchKey === 'ON') return
    if (this.props.deviceType === 'VIRTUAL_AIR_REMOTE') {
    this.setState({
      speed:(this.state.speed+1)%4
    },function(){
      this.props.actions.changeTem(this.state.currentTemArray[this.state.temIndex],deviceId)
    })
  }

  if(this.props.deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE' || this.props.deviceType === 'AIR-CONDITIONER'){
    this.setState({
      speed:(this.state.speed+1)%4,
      num:null,
      snum:null
    },function(){
      
      if(this.state.speed == 0){
        this.state.num = 0
        this.state.snum = 0
      }else if(this.state.speed == 1){
        this.state.num = 1
        this.state.snum = 1
      }else if(this.state.speed == 2){
        this.state.num = 3
        this.state.snum = 2
      }else{
        this.state.num = 5
        this.state.snum = 3
      }
      this.props.actions.centerchangeTem(this.state.currentTemArray[this.state.temIndex],deviceId,this.state.model,this.state.num,'WINDSPEED',this.state.snum)
    })
  }
}
 
  //模式改变
  modelChange(deviceId){
    if(this.state.switchKey==='ON') return
    const currentModel = this.state.model==='cold'?'制热':'制冷'
    const currentTemArray = currentModel==='制冷'?this.props.air.coolWays:this.props.air.warmWays
    console.log(currentModel,currentTemArray,this.props.air)
    const centerIndex = currentTemArray.indexOf(25) > -1 ? currentTemArray.indexOf(25) : 0
    
    if(this.props.deviceType === 'VIRTUAL_AIR_REMOTE'){
       this.setState({
         model:this.state.model==='cold'?'hot':'cold',
         temIndex:0,
         currentTemArray:currentTemArray
      },function(){ 
        this.props.actions.changeTem(this.state.currentTemArray[this.state.temIndex],deviceId)
        // console.log(this.state.currentTemArray)
      })
    }
    if(this.props.deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE' || this.props.deviceType === 'AIR-CONDITIONER'){
      this.setState({
        model:this.state.model==='cold'?'hot':'cold',
        temIndex: centerIndex,
        currentTemArray:currentModel==='制冷'?this.props.air.coolWays:this.props.air.warmWays
      },function(){
      this.props.actions.centerchangeTem(this.state.currentTemArray[this.state.temIndex],deviceId,this.state.model,this.state.speed,'mode',this.state.model)
      })
    }
    
  }
   
  render(){
    const { deviceId } = this.props.air
    const { switchKey,temIndex,model,currentTemArray,source} = this.state
    const status = sessionStorage.getItem('source')
    console.log(this.state,status)
    const { deviceType }  = this.props
    console.log(deviceType)
      return(
        <div styleName='air_wrap' style={{width:this.props.width}}>
        <div styleName="air_card_wrap">
          <div styleName="air_round">
            <figure styleName='air_figure' onClick={this.temChange.bind(this,'minus',deviceId)}>
              <div styleName="air_figure_img no_bg">
              {
               switchKey === 'ON'? 
              <img styleName='btn_tmp' src={require('../../assets/imgs/air/c-_off.png')} alt=""/>:
              <img styleName='btn_tmp' src={require('../../assets/imgs/air/c-.png')} alt=""/>
              }
              </div>
              <figcaption style={{color:'#666'}}>温度-</figcaption>
            </figure>
            <div styleName="middle_round"  >
            <img src={switchKey!=='ON'?require('../../assets/imgs/air/round_bg.png'):require('../../assets/imgs/air/round_bg_OFF.png')} alt=""/>
            
              <div styleName='middle_round_content'>
                <div>
                  {
                    status == '1' ?
                    <span styleName='middle_round_tem'>{switchKey !=='ON'? (deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE' ? currentTemArray[temIndex]:currentTemArray[temIndex].slice(-2)):25}</span>
                    :
                  <span styleName='middle_round_tem'>{switchKey !=='ON'? currentTemArray[temIndex]:24}</span>
                  }
                  
                  <sup>℃</sup> 
                </div>
                <span>预设的温度</span>
              </div>
            </div>
            <figure styleName='air_figure' onClick={this.temChange.bind(this,'plus',deviceId)} >
              <div styleName="air_figure_img no_bg">
              {
               switchKey === 'ON' ?
                <img styleName='btn_tmp' src={require('../../assets/imgs/air/c+_off.png')} alt=""/>:
                <img styleName='btn_tmp' src={require('../../assets/imgs/air/c+.png')} alt=""/>
              }
              </div>
              <figcaption style={{color:'#666'}}>温度+</figcaption>
            </figure>
        </div>
        {/* <div styleName="set_tem_wrap">
          <span>预设温度</span>
          <span>20℃</span>
        </div> */}
        <div styleName="divider"></div>
        <div styleName="air_btn">  
            <figure styleName='air_figure' onClick={this.switchClick.bind(this,deviceId)}>
              <div styleName="air_figure_img">
                <img styleName='btn_speed' src={require(`../../assets/imgs/air/switch_${switchKey}.png`)} alt=""/>
              </div>
              <figcaption style={{color: switchKey!=='ON'?'#6095f0':'#666'}}>开关</figcaption>
            </figure>
           <figure styleName='air_figure' onClick={this.speedChange.bind(this,deviceId,deviceId)}>
            <div styleName="air_figure_img">
            {
               switchKey === 'ON' ?
              <img styleName='btn_speed' src={require(`../../assets/imgs/air/speed_0.png`)} alt=""/>:
              <img styleName={'speed' + this.state.speed} src={require(`../../assets/imgs/air/speed_${this.state.speed}.png`)} alt=""/>
              }
            </div>
            <figcaption style={{color: switchKey!=='ON'&& this.state.speed !== 0?'#6095f0':'#666'}}>风速</figcaption>
          </figure>
          <figure styleName='air_figure' onClick={this.modelChange.bind(this,deviceId)}>
            <div styleName="air_figure_img">
            {
             switchKey === 'ON' ? 
              <img styleName='btn_speed' src={require(`../../assets/imgs/air/cold_off.png`)} alt=""/>:
              <img styleName='btn_speed' src={require(`../../assets/imgs/air/${model}.png`)} alt=""/>
            }
            </div>
            <figcaption style={{color: switchKey!=='ON'?'#6095f0':'#666'}}>模式</figcaption>
          </figure>
         </div>
       </div>
       
       
        </div>
    )
  }
}

export default AirOne