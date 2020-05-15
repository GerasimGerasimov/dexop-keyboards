import React from 'react'
import KeyBoardNumeric from './KeyBoardNumeric';
import KeyBoardBoolean from './KeyBoardBoolean';

interface IEventFunction {
    (event: any): void;
}

interface IKeyBoardProps {
    keyBoardType: string
    onClick: IEventFunction;
}

export default class KeyBoard extends React.Component<IKeyBoardProps,{}> {
  render() {
    const { keyBoardType, ...props } = this.props

    let KeyBoard = null
    switch (keyBoardType) {
      case 'KeyBoardBoolean':
            KeyBoard = KeyBoardBoolean
        break
      case 'KeyBoardNumeric':
      default: 
        KeyBoard = KeyBoardNumeric
    }

    return (
      React.createElement(KeyBoard, { ...props})
    )
  }
}