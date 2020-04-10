import React from 'react'

export default function SwipeTye(WrappedComponent) {
    return class HOC extends React.Component {
        constructor() {
          super()
          this.count = 0 //判断用户是否第一次进行touchmove操作
          this.countSwipe=0
          this.startX = 0
          this.startY = 0
          this.endX = 0
          this.endY = 0
          this.distanceX = 0
          this.distanceY = 0
          this.state = {
            swipeType: '',
            count: 0,
            winWidth: 0
        }
      }

        componentDidMount() {
            this.setState({
                winWidth: window.innerWidth
            })
            window.addEventListener('resize', this.onWindowResize.bind(this))
        }
        componentWillUnmount() {
            window.removeEventListener('resize', this.onWindowResize.bind(this))
        }
        onWindowResize() {
            this.setState({
                winWidth: window.innerWidth
            })
        }
        touchstart(e) {
            //e.preventDefault() 
            this.count = 0; //每次开始点击时清零
            this.startX = e.targetTouches[0].clientX;
            this.startY = e.targetTouches[0].clientY;
        }
        touchmove(e) {
            //e.preventDefault()
            if (this.count === 0) { //如果是第一次滑动
                this.endX = e.changedTouches[0].clientX;
                this.endY = e.changedTouches[0].clientY;
                this.distanceX = Math.abs(this.startX - this.endX);
                this.distanceY = Math.abs(this.startY - this.endY);
                if (this.distanceX > this.distanceY) { //如果X绝对距离大于Y绝对距离
                    e.preventDefault();
                }
            }
            this.count++;
        }
        touchend(e) {
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            this.distanceX = Math.abs(this.startX - this.endX);
            this.distanceY = Math.abs(this.startY - this.endY);
            if (this.distanceX > this.distanceY) { 
                this.startX - this.endX > 0 ?  this.setState({count:this.state.count+1}) : this.setState({count:this.state.count-1})
            }
        }
        touchcancel(e) {
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            this.distanceX = Math.abs(this.startX - this.endX);
            this.distanceY = Math.abs(this.startY - this.endY);
            if (this.distanceX > this.distanceY) {
            	this.startX - this.endX > 0 ?  this.setState({count:this.state.count+1}) : this.setState({count:this.state.count-1})
            }
        }
        render() {
            const newProps = {
                state: this.state,
                touchstart: this.touchstart.bind(this),
                touchmove: this.touchmove.bind(this),
                touchend: this.touchend.bind(this),
                touchcancel: this.touchcancel.bind(this),
                componentDidMount:this.componentDidMount.bind(this),
                componentWillUnmount:this.componentWillUnmount.bind(this),
            }
            return (
                <div style={{height:'100%'}}>
                  <WrappedComponent { ...this.props } { ...newProps }/>
                </div>
            )
        }
    }
}