import React, {Component} from 'react'
import {IKeyBoardProps } from './IKeyBoards';

export default class KeyBoardNumeric extends Component<IKeyBoardProps, {}> {

  constructor (props: any){
    super(props)
  }

  handleHide(e: any) {
    this.props.onClick(e);
  }

  render() {
    return(
      <div>
        <h1>KeyBoardNumeric</h1>
          <button onClick={(e)=>this.handleHide(e)}>Hide modal</button>
      </div>
    )
  }
}