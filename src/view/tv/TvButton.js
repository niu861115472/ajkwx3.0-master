import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'

import styles from './tv.css'

@CSSModules(styles, { allowMultiple: true })
class TvButton extends React.Component {
  render(){
    const btn_class = classNames({
      'btn-wrap':true,
      [this.props.classType]:true
    })
    return(
      <div styleName={btn_class} onClick={this.props.click}>
            <div styleName="btn_img"></div>
      </div>
    )
  }
}

export default TvButton