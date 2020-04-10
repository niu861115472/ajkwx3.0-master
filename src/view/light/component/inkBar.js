import React from 'react'
import styles from '../light.css'

export default function InkBar(props) {
  return <div className={styles.inkBar} style={{
    WebkitTransform: `translate3d(${props.left}px, 0, 0)`,
    transform: `translate3d(${props.left}px, 0, 0)`,
    width: props.width,
  }}>
  </div>
}