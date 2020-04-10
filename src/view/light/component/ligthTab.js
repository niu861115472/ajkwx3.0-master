import React from 'react'
import styles from '../light.css'
// import InkBar from './inkBar'
// import { Motion, spring } from 'react-motion';
 
// function getOffset(el) {
//   const html = el.ownerDocument.documentElement;
//   const box = el.getBoundingClientRect();

//   return {
//     top: box.top + window.pageYOffset - html.clientTop,
//     left: box.left + window.pageXOffset - html.clientLeft,
//   };
// }

export default class LightTab extends React.Component {
  // state = {
  //   inkBarLeft: 0
  // }
  // componentDidMount() {
   
  //   let activeIndex = this.getActiveIndex()
    
  //   const el = this.tabDom.querySelectorAll('li')[activeIndex];
  //   this.setState({
  //     inkBarLeft: getOffset(el).left + 4,
  //   })
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.type !== this.props.type) {
  //     let activeIndex = this.getActiveIndex()
  //     const el = this.tabDom.querySelectorAll('li')[activeIndex];

  //     this.setState({
  //       inkBarLeft: getOffset(el).left + 4,
  //     });
  //   }
  // }
  // getActiveIndex() {
  //   const arr = ['卧室','走廊','卫生间','其他']
  //   let activeIndex = 0
  //   arr.forEach((item,index) => {
  //     if(item === this.props.type) {
  //       activeIndex = index
  //     }
  //   })
  //   return activeIndex
  // }
  render() {
    const arr = ['卧室','走廊','卫生间','其他']
    return (
      <div className={styles.tablists}>
          {/*<Motion style={{ left: spring(this.state.inkBarLeft) }}>
                  {({ left }) => <InkBar width={50} left={left} />}
          </Motion>*/}
        <ul className={styles.tabs} ref={(ul)=>this.tabDom=ul}>
          {
            arr.map((type,index) => {
              return <li 
                key={type} 
                onClick={()=>this.props.middelRoundClick(type)}
                className={ this.props.type === type?styles.type_active:''}>{type}</li>
            })
          }
        </ul>
      </div>
    )
  }
}