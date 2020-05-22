import React, {Component} from 'react'
import {IKeyBoardProps } from '../IKeyBoards';
import './KeyBoardNumeric.css'
import KeyBoardButton from '../KeyBoardButton/KeyBoardButton';

interface IState {
  value: string;
}

export default class KeyBoardNumeric extends Component<IKeyBoardProps, IState> {

  private prevValue: string = this.props.data.value.toString();
  private selection = {
    selectionStart:0,
    selectionEnd:0,
    selectionDirection:''
  }
  private textInput: any = React.createRef();
  private position: number = this.props.data.value.toString().length;
  
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
    event.persist();
    const value = event.target.value;
    this.setState(state => ({value}))
    console.log(this.state.value)
  }

  private returnPrevValue() {
    this.setState({value: this.prevValue})
  }

  private getCaretPosition(target: any){
    const {selectionStart, selectionEnd, selectionDirection} = target;
    this.selection = {
      selectionStart,
      selectionEnd,
      selectionDirection
    }
    this.position = this.selection.selectionStart;
    console.log(selectionStart,
                 selectionEnd,
                  selectionDirection,
                    'pos:'+this.position)
  }

  //удаляет символы перед курсором
  private backSpaceKey(){
    var value = this.state.value;
    var begin: number = this.selection.selectionStart;
    var end: number = this.selection.selectionEnd;
    if (begin === end) {
      begin = begin? --begin : begin;
    }
    value = value.slice(0, begin) + value.slice(end);
    this.setState({value});
    //begin = begin? --begin : begin;
    this.selection.selectionStart = this.selection.selectionEnd = begin;
    this.position = begin;
    this.focus();
  }

  //удаляет символы после курсора
  private deleteKey(){
    var value = this.state.value;
    var begin: number = this.selection.selectionStart;
    var end: number = this.selection.selectionEnd;
    if (begin === end) {
      end ++;
    }
    value = value.slice(0, begin) + value.slice(end);
    this.setState({value});
    this.position = end;
    this.focus();
  }

  private focus() {
    const position = this.position;
    console.log('focus:',position)
    this.textInput.current.focus();
  }

  componentDidUpdate(){
    var position: number = this.position;
    this.textInput.current.setSelectionRange(position, position)
    this.focus();
  }

  private Enter(event: any): boolean {
    event.persist();
    console.log('Enter',event);
    if(event.key === 'Enter'){
      this.handleHide('ok');
      return true;
    }
    return false;
  }

  private upKeys(char: string) {
    this.focus();
    var position: number = this.position;
    var value = this.state.value;
    var a = value.split(' '); 
    a.splice(position, 0, char);
    value = a.join('');
    this.setState(state => ({value}))
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
                  ref={this.textInput}
                  className="KeyBoardText"
                  onChange={(event)=>this.inputChangedHandler(event)}
                  onKeyUp={(event)=>this.Enter(event)}
                  onClick={(event)=>this.getCaretPosition(event.target)}
                  value = {this.state.value}>
                </input>
            </div>
            <KeyBoardButton position="kbn-ok" value="Ok"  onClick={()=>this.handleHide('ok')}/>            
            <KeyBoardButton position="kbn-cancel" value="Chancel"  onClick={()=>this.handleHide('cancel')}/>
            <KeyBoardButton position="kbn-del" value="DEL"  onClick={()=>this.deleteKey()}/>
            <KeyBoardButton position="kbn-backspace" value="←"  onClick={()=>this.backSpaceKey()}/>
            <KeyBoardButton position="kbn-dot" value="." onClick={(event)=>{}}/>
            <KeyBoardButton position="kbn-return" value="R" onClick={()=>{this.returnPrevValue()}}/>
            <KeyBoardButton position="kbn-n0" value="0" onClick={() => {this.upKeys('0')}}/>
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

/*
  private setUserKeyBoardEvent(key: string) {
    const keyObj: any = { key ,
      bubbles: true,
      cancelable: false,
      keyCode:8,
      which: 8
    }
    var down = new KeyboardEvent('keydown', keyObj);
    var press = new KeyboardEvent('keypress', keyObj);
    var up = new KeyboardEvent('keyup', keyObj);
      this.focus();
      this.textInput.current.dispatchEvent(down);
      this.textInput.current.dispatchEvent(press);
      this.textInput.current.dispatchEvent(up);
  }

  //удаляет символы перед курсором
  private backSpaceKey(){
    this.setUserKeyBoardEvent('Backspace')
  }
*/