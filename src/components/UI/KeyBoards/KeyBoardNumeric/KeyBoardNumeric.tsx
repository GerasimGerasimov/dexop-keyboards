import React, {Component} from 'react'
import {IKeyBoardProps } from '../IKeyBoards';
import './KeyBoardNumeric.css'
import KeyBoardButton from '../KeyBoardButton/KeyBoardButton';

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

  private returnPrevValue() {
    this.setState({value: this.prevValue})
  }

  private getCaretPosition(obj: any){
    //TODO реализовать определение позиции курсора (для DEL и BACK)
    /*
    var cursorPos = null;
    if (document.getSelection()){
        var range = document.getSelection().createRange();
        range.moveStart('textedit', -1);
        cursorPos = range.text.length;
    }
    else 
    {
        cursorPos = obj.selectionStart;
    }
    */
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
                  onClick={(event)=>this.getCaretPosition(event)}
                  value = {this.state.value}>
                </input>
            </div>
            <KeyBoardButton position="kbn-ok" value="Ok"  onClick={()=>this.handleHide('ok')}/>            
            <KeyBoardButton position="kbn-cancel" value="Chancel"  onClick={()=>this.handleHide('cancel')}/>
            <KeyBoardButton position="kbn-del" value="DEL"  onClick={()=>this.handleHide('cancel')}/>
            <KeyBoardButton position="kbn-backspace" value="←"  onClick={()=>this.handleHide('cancel')}/>
            <KeyBoardButton position="kbn-dot" value="." onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-return" value="R" onClick={()=>{this.returnPrevValue()}}/>
            <KeyBoardButton position="kbn-n0" value="0" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n1" value="1" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n2" value="2" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n3" value="3" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n4" value="4" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n5" value="5" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n6" value="6" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n7" value="7" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n8" value="8" onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-n9" value="9" onClick={(event)=>{}}/>
          </div>
      </div>
    )
  }
}