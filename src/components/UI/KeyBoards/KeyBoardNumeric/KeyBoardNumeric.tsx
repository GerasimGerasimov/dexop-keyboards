import React, {Component} from 'react'
import {IKeyBoardProps } from '../IKeyBoards';
import './KeyBoardNumeric.css'

interface IState {
  value: string;
}

export default class KeyBoardNumeric extends Component<IKeyBoardProps, IState> {

  private prevValue: string = this.props.data.value.toString();
  
  constructor (props: any){
    super(props)
    this.state = {
      value:  this.prevValue
    };
  }

  private handleHide(cause: string) {
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

  private inputChangedHandler = (event: any) => {
    const value = event.target.value;
    this.setState({value})
    console.log(this.state.value)
  }

  private Enter(event: any) {
    if(event.key === 'Enter'){
      this.handleHide('ok')
    }
  }

  render() {
    return(
      <div className="KeyBoardBlock">
          <div className="kbn-grid-container">
            <div className="kbn-header">
              {`${this.props.data.name}:${this.prevValue}`}
            </div>
            <div className="kbn-discription">Ток возбуждения</div>
            <div className="kbn-value">
              <input
                  type="text"
                  className="KeyBoardText"
                  onChange={(event)=>this.inputChangedHandler(event)}
                  onKeyDown={(event)=>this.Enter(event)}
                  value = {this.state.value}>
                </input>
            </div>
            <div className="kbn-ok">
              <button 
                  className="KeyBoardButton"
                  onClick={()=>this.handleHide('ok')}>Ok
                </button>
            </div>
            <div className="kbn-cancel">
              <button
                className="KeyBoardButton"
                onClick={()=>this.handleHide('cancel')}>Chancel
              </button>
            </div>
            <div className="kbn-del">DEL</div>
            <div className="kbn-backspace">←</div>
            <div className="kbn-dot">.</div>
            <div className="kbn-return">R</div>
            <div className="kbn-n0">0</div>
            <div className="kbn-n1">1</div>
            <div className="kbn-n2">2</div>
            <div className="kbn-n3">3</div>
            <div className="kbn-n4">4</div>
            <div className="kbn-n5">5</div>
            <div className="kbn-n6">6</div>
            <div className="kbn-n7">7</div>
            <div className="kbn-n8">8</div>
            <div className="kbn-n9">9</div>
          </div>
      </div>
    )
  }
}