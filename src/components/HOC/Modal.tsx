import React, {Component} from 'react'
import ReactDOM from 'react-dom';

export default class Modal extends Component<{}, {}> {

  constructor (props: any){
    super(props)
  }

  componentDidMount() {
    //modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    //modalRoot.removeChild(this.el);
  }

  render() {
    return (
    <div className="modal">
      {this.props.children}
    </div>
  )}
}