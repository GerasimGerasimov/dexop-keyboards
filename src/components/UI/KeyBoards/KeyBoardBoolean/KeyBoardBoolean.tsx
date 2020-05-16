import React, {Component} from 'react'
import {IKeyBoardProps } from '../IKeyBoards';
import './KeyBoardBoolean.css'

export default class KeyBoardBoolean extends Component<IKeyBoardProps, {}> {

  constructor (props: any){
    super(props)
  }

  handleHide(e: any) {
    this.props.onClick(e);
  }

  render() {
    return(
      <div>
          <div className="grid-container">
            <div className="Value">
              <input
                type="text"
                className="KeyBoardText">
              </input>
            </div>
            <div className="Ok">
              <button 
                className="KeyBoardButton"
                onClick={(e)=>this.handleHide(e)}>Ok
              </button>
            </div>
            <div className="Chancel">
              <button
                className="KeyBoardButton"
                onClick={(e)=>this.handleHide(e)}>Chancel
              </button>
            </div>
            <div className="No">
              <button 
                className="KeyBoardButton"
                >0
              </button>
            </div>
            <div className="Yes">
            <button 
                className="KeyBoardButton"
                >1
              </button>
            </div>
            <div className="Name">Name</div>
          </div>
      </div>
    )
  }
}