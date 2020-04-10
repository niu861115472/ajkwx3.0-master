import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'


import styles  from './login.css'
import * as actions from '../../actions/login-actions'
import * as selectHomeActions from '../../actions/selectHome-actions'

import LoginLogo from './components/login-logo/LoginLogo'
import LoginForm from './components/login-form/LoginForm'

@connect(
  state => ({loginState:state.toObject().loginStore,idStore:state.toObject().idStore}),
  dispatch => ({
    loginActions: bindActionCreators(actions, dispatch),
    selectHomeActions: bindActionCreators(selectHomeActions, dispatch)
  })
)
@CSSModules(styles, { allowMultiple: true})
class Login extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      timeCount: 0,
      getTimeIf: false
    }
    this.getLoginCode = this.getLoginCode.bind(this)
    this.login = this.login.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
  }
  componentDidMount() {
    const searchArr = window.location.search.slice(1).split('&') 
    if(searchArr.length < 2) return 
    let query = {}
    searchArr.forEach((item) => {
      const _item = item.split('=')
      query[_item[0]] = _item[1]
    })
    const userInfo = {
      userName: window.atob(query.key),
      password: window.atob(query.sign)
    }

    this.props.loginActions.dataSuccess(userInfo)
  }
  componentWillUnmount() {
    if(this.timer) clearInterval(this.timer)
  }

  

  handleChange(name,e){
    this.props.loginActions.changeUserAndPassword(name,e.target.value)
  }
  //获取密码
  getLoginCode(){
    if(this.state.getTimeIf) return 
    
    const {userName} = this.props.loginState;
    if (!userName) {
      Toast.info('手机号码不能为空',2)
      return
    }
    if (!(/^1[34578]\d{9}$/.test(userName))) {
      Toast.info('请输入正确的手机号',2);
      return;
    }
    this.setState({
      getTimeIf: true,
      timeCount: 60
    },()=>{
      this.verTimeCount()
      this.props.loginActions.getLoginCode(userName)
    })
  }
  verTimeCount=() => {
    if(this.timer) clearInterval(this.timer) 
    this.timer = setInterval(()=>{
      if(!this.state.timeCount) {
        clearInterval(this.timer)
        this.setState({
          getTimeIf: false
        })
      }else{
        this.setState({
          timeCount:  this.state.timeCount - 1
        })
      }
    },1000)
  }
  //登录
  login(){
    const {userName,password,isRemenber} = this.props.loginState;

    if (!userName) {
      Toast.info('手机号码不能为空',2);
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(parseInt(userName, 10)))) {
      Toast.info('请输入正确的手机号',2);
      return;
    }
    if(!password){
      Toast.info('密码不能为空',2);
      return;
    }
    if(!(/[\d+]{6}/.test(password))){
      Toast.info('请输入正确密码',2);
      return;
    }
    this.props.loginActions.goHome(userName,password,isRemenber);
  }
  //是否记住密码
  checkboxChange(){
    const {isRemenber} = this.props.loginState;
  }
  render() {
    return (
      <div styleName='logo_bg'>
        <LoginLogo />
        <div styleName="login_form">
          <LoginForm 
            timeCount={this.state.timeCount}
            formData={this.props.loginState}
            handleChange={this.handleChange.bind(this)}
            checkboxChange={this.checkboxChange.bind(this)}
            getLoginCode={this.getLoginCode.bind(this)}
            login={this.login.bind(this)} />
        </div>
      </div>
   )
  }
}

export default Login