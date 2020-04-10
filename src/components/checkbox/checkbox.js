import React from 'react'

import styles from './checkbox.css'

class Checkbox extends React.Component {
    onchange(){
        
    }
    render() {
        const { checked, onchange } = this.props
        return (
            <div className = { styles.checkbox } >
                <input type = "checkbox"
                    id = 'rememberPassword'
                    className = { styles.checkbox_input }
                    checked = { checked }
                    onChange={this.onchange.bind(this)} /> 
                <label htmlFor = "rememberPassword" className = { styles.checkbox_label } onClick={onchange} > </label></div>
        )
    }
}

export default Checkbox