import React from 'react';
import styles from './readLightRange.css'


export default function ReadLightRange(props) {
  return (
     <div className={styles.inputRange} >
      <input className={styles.input} value={props.value} type="range"  min="0" max="100" onChange={props.rangeChange1}   style={{'background':`linear-gradient(to right, #ffb354, #ffb354 ${props.value}%, white ${props.value}% ,white)`}} onTouchEnd={props.onChangefn}/>
    </div>
  )
}