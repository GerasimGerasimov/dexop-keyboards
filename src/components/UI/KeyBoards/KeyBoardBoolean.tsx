import React, {Component} from 'react'

interface IEventFunction {
    (event: any): void;
}

interface IModalProps {
    onClick: IEventFunction;
}

export default class KeyBoarBoolean extends Component<IModalProps, {}> {

  constructor (props: any){
    super(props)
  }

  handleHide(e: any) {
    this.props.onClick(e);
  }

  render() {
    return(
      <div>
        <h1>KeyBoardBoolean</h1>
          <button onClick={(e)=>this.handleHide(e)}>Hide modal</button>
      </div>
    )
  }
}