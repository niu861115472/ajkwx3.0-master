import React from 'react'
import styles from '../../readLight.css'

export default function ReadLightSwitch(props) {
  return (
    <div className={styles.switch}>
      <span className={styles.switch_label}>打开灯光</span>
      <img className={styles.switch_img} alt='' src={require(`../../../../assets/imgs/light/readLight_${props.status}.png`)} onClick={props.clickfn}/>
    </div>
  )
}