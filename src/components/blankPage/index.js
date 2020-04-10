import React from 'react';
import  styles from './index.css'

const BlankPage = (props) => {
    return (
        <div className={styles['blank-page']}>
            <img src={require(`./assets/${props.src}.png`)} alt=""/>
            <p style={{color: props.titleColor? props.titleColor : '#fb7346'}}>{props.title}</p>
        </div>
    )
}

export default BlankPage