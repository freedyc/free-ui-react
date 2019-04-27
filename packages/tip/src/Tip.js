import React, { Component } from 'react'
import Portal from '@dengyongchao/portal'
import './Tip.css'
export default class MyTips extends Component {
    static defaultProps = {
      value:'',
      // max-width:400,
      // max-height:400,
      trigger:'hover'
    }

    constructor(p){
        super(p)

        this.state={
            style:{
              top:0,
              left:0
            },
            open:false
        }
      }

      componentDidMount(){
        if(this.props.trigger==='click')
          document.addEventListener('click', this.closeTips, false)
      }

  render() {
    const {value,maxWidth,maxHeight,trigger} = this.props

    return (
      <div style={{position:'relative'}} onMouseOver={trigger==='hover'?this.openTips:this.empty} onMouseOut={trigger==='hover'?this.closeTips:this.empty} onClick={trigger==='click'?this.openTips:this.empty}>
        <div ref='father'>
          {this.props.children}
        </div>
        <Portal open={this.state.open}>
          <div className='popup' style={this.state.style} ref='popup'>
            <div className='content' style={{maxWidth:`${maxWidth}px`,maxHeight:`${maxHeight}px`}}>{value}</div>
          </div>
        </Portal>
      </div>
    )
  }
  openTips=(e)=>{
    e.nativeEvent.stopImmediatePropagation();
    const father = this.refs.father
    const fatherX = father.getBoundingClientRect().x
    const fatherY = father.getBoundingClientRect().y
    const popupX = fatherX+(father.clientWidth/2)
    const popupY = fatherY+(father.clientHeight)
    this.setState({
      style:{
        top:popupY,
        left:popupX,
      },
      open:true
    })
  }
  closeTips=()=>{
    this.setState({
      style:{
        display:'none',
      }
    })
  }
  empty=()=>{

  }
}
