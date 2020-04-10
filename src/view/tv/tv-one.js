import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './tv.css'

@CSSModules(styles, { allowMultiple: true })
class TvOne extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      tv:'OFF',
      tvBox:'OFF'
    }
  }  
  componentDidMount() {
    const { tvStatus, tvBoxStatus } = this.props.tv

    this.setState({
      tv: tvStatus,
      tvBox: tvBoxStatus 
    })
  }
  numClick(type,e){
    if(type==='tv') {
      this.tvCtrl(e.target.getAttribute('data-key'))
    }else{
      this.tvBoxCtrl(e.target.getAttribute('data-key'))
    }
  }
  tvCtrl(key){
    let deviceId
    for(let i in this.props.tv){
      if (i.indexOf('电视机')>-1) {
        deviceId = this.props.tv[i]
      }
    }
    if (key === 'ON'||key === 'OFF') {
      this.setState({
        tv:key ==='ON'?'OFF':'ON'
      },function(){
        this.props.actions.tvCtrl(this.state.tv,deviceId)
      })
    }else{
      this.props.actions.tvCtrl(key,deviceId)
    }
  }
  tvBoxCtrl(key){
     let deviceId
    for(let i in this.props.tv){
      if (i.indexOf('机顶盒')>-1) {
        deviceId = this.props.tv[i]
      }
    }
    if (key === 'ON'||key === 'OFF') {
      this.setState({
        tvBox:key ==='ON'?'OFF':'ON'
      },function(){
        this.props.actions.tvCtrl(this.state.tvBox,deviceId)
      })
    }else{
      this.props.actions.tvCtrl(key,deviceId)
    }
  }
  render(){
    return (
      <div styleName="tv_wrap" >
        <section styleName='tv_section'>
          <div styleName='tv_flex'>
            <span styleName='section_title'>电视控制区</span>
            {
              this.state.tv === 'ON'?
              <img  src={require('../../assets/imgs/tv/switch_on.png')} onClick={this.tvCtrl.bind(this,this.state.tv)} alt=""/>:
              <img  src={require('../../assets/imgs/tv/switch_icon.png')} onClick={this.tvCtrl.bind(this,this.state.tv)} alt=""/>
            }
          </div>
          <div styleName='tv_flex'>
            {/* <span styleName='pressActive menu' onClick={this.tvCtrl.bind(this,'MENU')} style={{color:'#666'}}>TV/AV</span> */}
            <span styleName='pressActive menu'>信号源<img src={require('../../assets/imgs/tv/plus.png')} alt=""/></span>
            <span styleName='pressActive menu'>信号源<img src={require('../../assets/imgs/tv/munis.png')} alt=""/></span>
            <img styleName='pressActive' src={require('../../assets/imgs/tv/voice-.png')} onClick={this.tvCtrl.bind(this,'VOL_SUB')} alt=""/>
            <img styleName='pressActive' src={require('../../assets/imgs/tv/voice+.png')} onClick={this.tvCtrl.bind(this,'VOL_PLUS')} alt=""/>
          </div>
        </section>

        <section styleName='tv_section'>
           <div styleName="tv_flex">
             <img styleName='pressActive' src={require('../../assets/imgs/tv/home.png')} onClick={this.tvBoxCtrl.bind(this,'HOME')} alt=""/>
             <span styleName='section_title'>机顶盒</span>
             {
              this.state.tvBox === 'ON'?
              <img  src={require('../../assets/imgs/tv/switch_on.png')} onClick={this.tvBoxCtrl.bind(this,this.state.tvBox)} alt=""/>:
              <img  src={require('../../assets/imgs/tv/switch_icon.png')} onClick={this.tvBoxCtrl.bind(this,this.state.tvBox)} alt=""/>
            }
           </div>
           <div styleName='tv_flex'>
            <div styleName="tv_flex channel_voice no-padding">
                <span styleName='pressActive'  onClick={this.tvBoxCtrl.bind(this,'VOL_PLUS')}>
                  <img src={require('../../assets/imgs/tv/plus.png')} alt=""/>
                </span>
                <span styleName="arr_title">音量</span>
                <span styleName='pressActive'  onClick={this.tvBoxCtrl.bind(this,'VOL_SUB')}>
                  <img src={require('../../assets/imgs/tv/munis.png')} alt=""/>
                </span>
            </div>
            <div styleName='round_wrap'>
              <span styleName="pressActive round" data-key='up' onClick={this.tvBoxCtrl.bind(this,'CH_PRE')}>
                <img src={require('../../assets/imgs/tv/arr_top.png')} alt=""/>
              </span>
              <span styleName="pressActive round" onClick={this.tvBoxCtrl.bind(this,'RIGHT')}>
                <img style={{width:'13px'}} src={require('../../assets/imgs/tv/arr_right.png')} alt=""/>
              </span>
              <span styleName="pressActive round" onClick={this.tvBoxCtrl.bind(this,'LEFT')}>
                <img style={{width:'13px'}} src={require('../../assets/imgs/tv/arr_left.png')} alt=""/>
              </span>
              <span styleName="pressActive round" onClick={this.tvBoxCtrl.bind(this,'CH_NEXT')}>
                <img src={require('../../assets/imgs/tv/arr_down.png')} alt=""/>
              </span>
                <div styleName="arr_ok" onClick={this.tvBoxCtrl.bind(this,'OK')}>
                  ok
                </div>
            </div>
            <div styleName="tv_flex channel_voice no-padding">
                <span styleName='pressActive'  onClick={this.tvBoxCtrl.bind(this,'CH_PRE')}>
                  <img src={require('../../assets/imgs/tv/plus.png')} alt=""/>
                </span>
                <span styleName="arr_title">频道</span>
                <span styleName='pressActive'  onClick={this.tvBoxCtrl.bind(this,'CH_NEXT')}>
                  <img src={require('../../assets/imgs/tv/munis.png')} alt=""/>
                </span>
              </div>
           </div>
           <div styleName='tv_flex'>
             <div styleName='tv_flex flexdirection_cloumn av_btns pressActive' onClick={this.tvBoxCtrl.bind(this,'RETURN')}>
               <div styleName='back_bg'></div>
               <span>返回</span>
             </div>
             <div styleName='tv_flex flexdirection_cloumn av_btns pressActive' onClick={this.tvBoxCtrl.bind(this,'PLAY')}>
               <div styleName='resee_bg'></div>
               <span>回看</span>
             </div>
             <div styleName='tv_flex flexdirection_cloumn av_btns pressActive' onClick={this.tvBoxCtrl.bind(this,'MUTE')}>
              <div styleName='mute_bg'></div>
               <span>静音</span>
             </div>
             <div styleName='tv_flex flexdirection_cloumn  av_btns pressActive' onClick={this.tvBoxCtrl.bind(this,'STOP')}>
               <div styleName='replay_bg'></div>
               <span>点播</span>
             </div>
           </div>
           <div styleName="tv_num" onClick={this.numClick.bind(this,'tvbox')}>
            <div styleName="num_item">
              <span styleName="num pressActive" data-key='1'>1</span>
              <span styleName="num pressActive" data-key='2'>2</span>
              <span styleName="num pressActive" data-key='3'>3</span>
              <span styleName="num pressActive" data-key='4'>4</span>
            </div>
            <div styleName="num_item">
              <span styleName="num pressActive" data-key='5'>5</span>
              <span styleName="num pressActive" data-key='6'>6</span>
              <span styleName="num pressActive" data-key='7'>7</span>
              <span styleName="num pressActive" data-key='8'>8</span>
            </div>
            <div styleName="num_item num_item_last">
              <span styleName="num pressActive" data-key='9'>9</span>
              <span styleName="num pressActive" data-key='0'>0</span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default TvOne