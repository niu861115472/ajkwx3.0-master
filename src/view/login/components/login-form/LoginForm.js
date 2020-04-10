import React from 'react';

import styles  from '../../login.css'
import Checkbox from '../../../../components/checkbox/checkbox'


export default function LoginForm(props) {
  const {userName,password,isRemenber} = props.formData
  return (
    <form action="" className={styles.form}>
        <p className={styles.form_group}>
          <label><img src={require('../../../../assets/imgs/login/username.png')} alt=""/></label>
          <input type="tel" maxLength='11'  value={userName} placeholder='请输入手机号' onChange={props.handleChange.bind(this,'userName')}/>
        </p>
        <p className={styles.form_group}>
          <label><img src={require('../../../../assets/imgs/login/lock.png')} alt=""/></label>
          <input type="password"  maxLength='6' value={password} placeholder='请输入密码' onChange={props.handleChange.bind(this,'password')}/>
        </p>
        <div className={styles.password_control}>
          <div className={styles.checkbox}> 
            <Checkbox checked={isRemenber} onchange={props.checkboxChange.bind(this)}/>
            <span>记住密码</span>
            
          </div>
          <p className={styles.getPassword} onClick={props.getLoginCode.bind(this)}>{props.timeCount===0?'获取密码':props.timeCount+'s'}</p>
        </div>
        <a className={styles.submit_button}  onClick={props.login}>登录</a>
      </form>
  )
}
