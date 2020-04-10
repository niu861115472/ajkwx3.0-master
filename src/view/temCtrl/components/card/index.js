import React from 'react';
import CSSModules from 'react-css-modules'
import styles from './index.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class CardCom extends React.Component {

    constructor(props) {
        super(props)

        const { ways } = this.props.data
        this.state = { 
            status: ways[0].status || 'OFF'
        }
    }
    

    switchClick = (flag) => {
        this.setState({
            status: flag
        })

        const status = flag === 'ON' ? "OPEN" : 'CLOSE'
        const { ways } = this.props.data

        this.props.smartControl({
            houseId: btoa(this.props.houseId),
            deviceType: 'SWITCH',
            actionType: status,
            wayId: ways[0].wayId,
            brightness: 80,
            operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
        })
    }

    render() {
        const { style } = this.props
        const { status } = this.state
        const cirStyle = "cir "+ (status === 'ON' ? 'cir_on':'cir_off')
        const openBtnStyle = "swtich " + (status === 'ON' ? 'active':'')
        const closeBtnStyle = "swtich " + (status === 'ON' ? '':'active_off')
        return (
            <div styleName='card_bg' style={style}>
                <div styleName={cirStyle}>
                    <div styleName='tem_wrap'>
                        <div styleName='tem'>
                                26
                          <span>℃</span>
                        </div> 
                        <div styleName='tem_title'>
                            <img src={require('../../assets/tem.png')} />
                            <span style={{color:'#fff'}}>室内温度</span>
                        </div>
                    </div>
                </div>
                <div styleName="swtich_wrap">
                    <div styleName={openBtnStyle} onClick={()=>this.switchClick('ON')}>
                        开
                    </div>
                    <div styleName={closeBtnStyle} onClick={()=>this.switchClick("OFF")}>
                        关
                    </div>
                </div>
            </div>
        );
    }
}

export default CardCom;