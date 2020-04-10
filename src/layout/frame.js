import React from 'react'
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

import './frame.css'


export default function (props){
  return (
       <ReactCSSTransitionGroup
                transitionName="transitionWrapper"
                component="div"
                className='transitionWrapper'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={props.location.pathname}
                     style={{position:"absolute", width: "100%",height:'100%'}}>
                    {
                        props.children
                    }
                </div>
            </ReactCSSTransitionGroup>
    )
}