import React, {Component} from 'react'
import Modal from './HOC/Modal';
import KeyBoardNumeric from './UI/KeyBoards/KeyBoardNumeric';
import KeyBoardBoolean from './UI/KeyBoards/KeyBoardBoolean';

interface IState {
  showModal: boolean;
  parameters: Map<string, TParameter>;
  keyBoard: string; 
}

class TParameter {
    name: string ='';
    value: number = 0;
    type: string = '';
    msu: string = '';
}
export default class DeviceParameters extends Component<{}, IState> {

  constructor (props: any){
    super(props)
    this.state = {
        showModal: false,
        parameters: new Map<string, TParameter>(),
        keyBoard: 'KeyBoardNumeric' 
    };
  }
  componentWillMount () {
    const P: any = Parameters
    for (let key in P) {
        const item: TParameter = {... P[key]};
        this.setState({
            parameters: this.getData(Parameters)
        })
    }
  }

  getData(p: any): Map<string, TParameter> {
    const m: Map<string, TParameter> = new Map<string, TParameter>()
    for (let key in p) {
        const value: TParameter = {... p[key]};
        m.set(key, value)
    }
    return m;
  }

  handlerModalShow(event: any) {
    const {row, col} = getTableClickRowCol(event);
    const p:TParameter | undefined = this.getParameterByRow(row);
    const type = p?.type || ''
    const keyBoard = this.getKeyBoardType(type);
    this.setState({
      showModal: true,
      keyBoard
    })
  }

  getKeyBoardType(ParameterType: string): string {
    switch (ParameterType) {
      case 'TBit':
        return 'KeyBoardBoolean'
      case 'TFloat':
      default:
        return 'KeyBoardNumeric'
    }
  }

  private getParameterByRow(row: number): TParameter | undefined {
    try {
      if (!row) throw RowCountError('Row number in not correct');
      let count: number = 1; 
      this.state.parameters.forEach((value: TParameter) => {
        if (count++ === row) {
          throw SuccessfullyValueFound('Element is found', value);
        }
      })
      throw FailedSearchOfValue('Element not found');
    } catch (e) {
        return e.value || undefined;
    }
  }

  handlerModalClose(e: any) {
    console.log(e);
    this.setState({showModal: false})
  }

  getKeyBoard(): any{
    switch (this.state.keyBoard) {
      case 'KeyBoardBoolean':
        return KeyBoardBoolean
      case 'KeyBoardNumeric':
      default:
        return KeyBoardNumeric
    }
  }

  render() {
    const modal = this.state.showModal ? (
    <Modal>
      <{this.getKeyBoard} onClick={this.handlerModalClose.bind(this)}/>
    </Modal>
    ) : null;

    return(
      <>
        <h1>Settings</h1>
          <div> 
            <table onClick = {(e)=>this.handlerModalShow(e)}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>M.U.</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    Array.from(this.state.parameters.entries(), ([key, item]) => {
                    const  {name, value, msu} = item;
                      return (
                        <tr key={key}>
                          <td>{name}</td>
                          <td>{msu}</td>
                          <td>{value}</td>
                        </tr>
                      )}
                    )}
                </tbody>
            </table>
          </div>
          {modal}
      </>
    )
  }
}

const Parameters = {
    Iexc : {
        name: 'Iexc',
        value: 100,
        type: 'TFloat',
        msu: 'V'
    },
    Uexc : {
        name: 'Uexc',
        value: 5,
        type: 'TFloat',
        msu: 'V'
    },
    Toggle : {
        name: 'Toggle',
        value: 0,
        type: 'TBit',
        msu: ''
    }
}

function getTableClickRowCol(event: any): {row: number, col: number} {
  let cell: any = event.target;
  if (cell.tagName.toLowerCase() !== 'td')
    return {row: 0, col: 0};
  let row = cell.parentNode.rowIndex;
  let col = cell.cellIndex;
  return {row, col};
}

class TAppError {
  message: string = '';
  name: string = '';
  stack?: any
  value?: any;
}

function RowCountError(message: string): TAppError {
  return {
    message,
    name:'RowCountError',
    value: undefined
  }
}

function SuccessfullyValueFound(message: string, value: any): TAppError {
  return {
    message,
    value,
    name:'SuccessfullyValueFound',
    stack: value.stack
  }
}

function FailedSearchOfValue(message: string): TAppError {
  return {
    message,
    name:'FailedSearchOfValue',
    value: undefined
  }
}