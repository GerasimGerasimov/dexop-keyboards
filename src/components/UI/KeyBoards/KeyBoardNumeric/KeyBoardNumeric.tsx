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
    console.log(selectionStart,
                 selectionEnd,
                  selectionDirection,
                    'pos:'+this.position)
  }

  //удаляет символы перед курсором
  private __backSpaceKey(){
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
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    //this.textInput.current.setSelectionRange(position, position);
    this.textInput.current.focus();
  }

  componentDidUpdate(){
    //this.getCaretPosition(this.textInput.current);
    this.focus();
  }

  private Enter(event: any) {
    event.persist();
    console.log('Enter',event);
    if(event.key === 'Enter'){
      this.handleHide('ok')
    }
  }

  private upKeys(event: any) {
    /*
    this.getCaretPosition(this.textInput.current);
    if (event.key === 'Backspace') {
      this.position = this.selection.selectionStart;
      console.log('upKeys: Backspace: new pos'+this.position)
      return;
    }
    this.position = this.position+2;//this.selection.selectionStart;
    console.log('upKeys: new pos'+this.position)
    */
  }

  private __setUserKeyBoardEvent(key: string) {
    var ev = new KeyboardEvent('keypress',
    {altKey:false,
      bubbles: true,
      cancelable: true,
      key: key,//"Enter",
      code: key,//"Enter",
      composed: true,
      ctrlKey: false,
      detail: 0,
      isComposing: false,
      location: 0,
      metaKey: false,
      repeat: false,
      shiftKey: false});
    
      this.focus();
      this.textInput.current.dispatchEvent(ev);
  }

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
      //this.focus();
      this.textInput.current.dispatchEvent(down);
      this.textInput.current.dispatchEvent(press);
      this.textInput.current.dispatchEvent(up);
    /*
      console.log('setUserKeyBoardEvent')
      var ev = new KeyboardEvent('keydown' , {key, code: '8'});
      this.focus();
      this.textInput.current.dispatchEvent(ev);
      */
  }

  //удаляет символы перед курсором
  private backSpaceKey(){
    this.setUserKeyBoardEvent('Backspace')
  }

  private handleKeypress(event: any) {
    console.log('handleKeypress'+event.key)
    if(event.keyCode == 0 && event.key != "") {
      this.textInput.current.value += event.key;
    }
  }
  
  //onKeyUp={(event)=>this.getCaretPosition(event.target)}
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
                  onKeyPress={(event)=>this.handleKeypress(event)}
                  onKeyDown={(event)=>this.Enter(event)}
                  onKeyUp={(event)=>this.upKeys(event)}
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