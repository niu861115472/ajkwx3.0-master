import React from 'react'
import styles from '../home.css'

export default function LockBtn(props) {
  return (
      <div className={styles.btn_wrap} onClick={props.openDoor}>
      </div>
  )
}