import React from 'react'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './models.css'
import * as modelActions from '../../actions/model-actions'

const source = sessionStorage.getItem('source')

@connect(
  state => ({modelState:state.toObject().modelStore}),
  dispatch => ({
    modelActions: bindActionCreators(modelActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
 class Models extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      model_activeIndex:-1
    }
    this.changeModel = this.changeModel.bind(this)
  }
  componentDidMount(){
    const serverId = this.props.location.query.serverId
    this.props.modelActions.initialModel(serverId)
  }
  changeModel(index, scenceId,roomId){
    if(this.state.model_activeIndex === index && this.delayIf) {
       return
    }
    this.setState({
      model_activeIndex:index
    })  
    this.props.modelActions.changeModel(scenceId, this.delayClick,roomId)
  }
  delayClick = () => {
    this.delayIf = true
    setTimeout(()=>{
      this.delayIf = false
    }, 2000)
  }
  modelRender_type1(){
    const modelArray = source == '1' ? this.props.modelState.models.scenes : this.props.modelState.models
    console.log(modelArray)

    const houseNo  = this.props.location.query.houseNo
    if(houseNo != ''){
      var scenes = modelArray.filter((scence) => !(scence.name.indexOf('情景') === -1))
    }
    else{
      var scenes = modelArray.filter((scence) => scence.name.indexOf('情景') === 0)
    }
    console.log(scenes)
    
    return scenes.map((model,index) => {
          let stylename = classNames({
                figure:true,
                [model.name.replace('情景', '')]:true,
                active:index === this.state.model_activeIndex,
                
             })
            return( 
              <figure styleName={stylename} key={model.name} onClick={this.changeModel.bind(this,index, model.sceneId,model.serverId)}>
                  <div>
                  </div>
                  <figcaption styleName='figcaption'>
                    {model.name.slice(-2)}
                  </figcaption>
                  {
                    index === this.state.model_activeIndex?
                    <img styleName='checked' src={require('../../assets/imgs/models/checked.png')} alt=""/>:null
                  }
              </figure>
              )
          })
      }
    //东方君悦模式
  modelRender_type2() {
    const scenes = this.props.modelState.models.scenes
    
    // var arr = scenes.map(item =>{
    //   return item.name
    // })
    
    console.log(scenes)
    if (scenes) {
      return scenes.map((model,index) => {
        // let style = model.name.indexOf('情景') > -1 ? "display:none" : ''
        let stylename = classNames({
          figure:true,
          [model.name.replace('情景', '')]:true,
          active:index === this.state.model_activeIndex,
          })
          return(
            <div>
              {
                model.name.indexOf('情景') > -1 ?
              <figure styleName={stylename} key={model.id} onClick={this.changeModel.bind(this,index,model.sceneId)}>
                  <div>
                  </div>
                  <figcaption styleName='figcaption'>
                    {model.name.replace('情景', '')}
                  </figcaption>
                  {
                    index === this.state.model_activeIndex?
                    <img styleName='checked' src={require('../../assets/imgs/models/checked.png')} alt=""/>:null
                  }
              </figure>:null
            }
          </div>
        )
      })
    }
  }
  render(){
    const type  = source == '2' ? 0 : this.props.modelState.models.type
    // const
    console.log(this.props.modelState.models)
    return(
      <div styleName='models_bg'>
          { type === 0 ? this.modelRender_type1() : this.modelRender_type2() }
          {/* {this.modelRender_type1()} */}
      </div>
    )
  }
}
export default Models