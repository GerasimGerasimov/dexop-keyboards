import React, {Component} from 'react'
import {IKeyBoardProps } from '../IKeyBoards';
import './KeyBoardBoolean.css'

interface IState {
  value: string;
}

export default class KeyBoardBoolean extends Component<IKeyBoardProps, IState> {

  private prevValue: string = this.props.data.value.toString();
  constructor (props: any){
    super(props)
    this.state = {
      value:  this.prevValue
    };
  }

  handleHide(cause: string) {
    const values: any = {
      'ok': this.state.value,
      'cancel':this.prevValue
    }
    const result: any = {
      cause,
      value: values[cause]
    }
    this.props.onClick(result);
  }

  handlerSetTrue(){
    this.setState({value:"1"})
  }

  handlerSetFalse(){
    this.setState({value:"0"})
  }

  inputChangedHandler = (event: any) => {
    const value = event.target.value;
    this.setState({value})
    console.log(this.state.value)
  }

  render() {
    return(
      <div className="KeyBoardBlock">
          <div className="grid-container">
            <div className="Value">
              <input
                type="text"
                className="KeyBoardText"
                onChange={(event)=>this.inputChangedHandler(event)}
                value = {this.state.value}>
              </input>
            </div>
            <div className="Ok">
              <button 
                className="KeyBoardButton"
                onClick={()=>this.handleHide('ok')}>Ok
              </button>
            </div>
            <div className="Cancel">
              <button
                className="KeyBoardButton"
                onClick={()=>this.handleHide('cancel')}>Chancel
              </button>
            </div>
            <div className="No">
              <button 
                className="KeyBoardButton"
                onClick={()=>{this.handlerSetFalse()}}
                >0
              </button>
            </div>
            <div className="Yes">
            <button 
                className="KeyBoardButton"
                onClick={()=>{this.handlerSetTrue()}}
                >1
              </button>
            </div>
            <div className="Name">{this.props.data.name}</div>
          </div>
      </div>
    )
  }
}