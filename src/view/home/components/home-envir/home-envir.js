import React from 'react'

import styles from '../../home.css'

export default function HomeEnvir(props) {
  return (
    <div className={styles.home_envir_play}>
          <div className={styles.home_envir_item}>
          <span>{props.temp||'24℃'}</span>
           <div className={styles.home_envir_item_left}>
           
            <img style={{width: '12px'}} src={require('../../../../assets/imgs/home/sheshidu.png')} alt=""/>
            <span>温度</span>
           </div> 
           
          </div>
          <div className={styles.home_envir_item}>
          <span>{props.temp||'50%'}</span>
            <div className={styles.home_envir_item_left}>
            
              <img style={{width: '14px'}} src={require('../../../../assets/imgs/home/shidu.png')} alt=""/>
              <span>湿度</span>
            </div>
           
          </div>
          <div className={styles.home_envir_item}>
          <span>{props.temp||'正常'}</span>
            <div className={styles.home_envir_item_left}>
              <img style={{width: '23px'}} src={require('../../../../assets/imgs/home/pm2.5.png')} alt=""/>
              <span>PM2.5</span>
            </div>
           
          </div>
      </div>  
  )
}