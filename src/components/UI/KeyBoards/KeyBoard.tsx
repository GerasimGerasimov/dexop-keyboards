import React from 'react'
import KeyBoardNumeric from './KeyBoardNumeric';
import KeyBoardBoolean from './KeyBoardBoolean';
import {IKeyBoardProps } from './IKeyBoards';

interface IKeyBoardsProps extends IKeyBoardProps {
    keyBoardType: string
}

export default class KeyBoard extends React.Component<IKeyBoardsProps,{}> {
  render() {
    const { keyBoardType, ...props } = this.props

    const KeyBoards: any = {
        KeyBoardBoolean,
        KeyBoardNumeric,
        'default': KeyBoardNumeric
    }

    const KeyBoard =  KeyBoards[keyBoardType] || KeyBoards['default'];

    return (
      React.createElement(KeyBoard, { ...props})
    )
  }
}