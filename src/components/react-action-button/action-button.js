import React, { PureComponent } from 'react'
import { Motion, StaggeredMotion, spring, presets } from 'react-motion'
import CSSModules from 'react-css-modules'
import styles from './fab-fan.css'

const customSpring = {stiffness: 200, damping: 18}

@CSSModules(styles, { allowMultiple: true })
export default class FabFan extends PureComponent {
  state = {
    open: false
  }

  childButtonStyle = pos => {
    return {
      transform: `translateX(${pos}rem)`
    }
  }

  render () {
    let { onClick, options, actionContainerStyle, open } = this.props
   
    const openValue = open ? 0 : 20

    let optsWithStyle = options.map(r => {
      return {
        ...r,
        style: {springIn: 20, opacity: 0}
      }
    })

    const nextStyle = previousStyles => {
      return previousStyles.map((_, i) => {
        if (i === 0) {
          return {opacity: spring(open ? 1 : 0), springIn: spring(openValue, customSpring)}
        } else {
          const lastButtonPreviousPos = previousStyles[i - 1].springIn

          return {
            springIn: spring(lastButtonPreviousPos, customSpring)
          }
        }
      })
    }
    
    const styles = this.props.styles
    return (
      <Motion
        style={{
          spinOpen: spring(open ? 270 : 0, presets.wobbly)
        }}
      >
        {({ spinOpen, expandOpts, fadeOpts }) => (
          <div className={styles.container}>
            <div className={styles.content}>

              <StaggeredMotion
                defaultStyles={optsWithStyle.map(o => o.style)}
                styles={nextStyle}
              >
                {interpolatingStyles =>{
                 return <div style={{...actionContainerStyle}}>
                    {
                      interpolatingStyles.map(({ springIn }, i) => {
                        const styled = this.childButtonStyle(springIn)

                        return (
                          <div
                            key={i}
                            style={styled}
                            onClick={()=>this.props.itemClick(optsWithStyle[i])}
                            className={styles.fabItem}
                          >
                            {optsWithStyle[i].name}
                          </div>
                        )
                      })
                    }
                  </div>
                  }
                }
              </StaggeredMotion>

              <div
                className={`${styles.fab} ${open ? 'active' : ''}`} style={{
                  transform: `rotate(${spinOpen}deg)`
                }}
                onClick={onClick}
              >
                {!open?'电梯':'x'}
              </div>
            </div>
          </div>
        )}
      </Motion>
    )
  }
}


