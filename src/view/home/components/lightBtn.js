import React from 'react'
import styles from '../home_2.0.css'

export default function LightBtn(props) {
  return (
      <div className={styles.light_wrap} onClick={props.openDoor}>
      </div>
  )
}