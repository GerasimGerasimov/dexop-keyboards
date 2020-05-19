import React, {Component} from 'react'
import {IKeyBoardProps } from '../IKeyBoards';
import './KeyBoardNumeric.css'

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
          <div className="kbn-grid-container">
            <div className="kbn-header">Iexc: 100.501013</div>
            <div className="kbn-discription">Ток возбуждения</div>
            <div className="kbn-value">100.501013</div>
            <div className="kbn-ok">Ok</div>
            <div className="kbn-cancel">Cancel</div>
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