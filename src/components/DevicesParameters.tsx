import React, {Component} from 'react'
import Modal from './HOC/Modal';
import KeyBoard from './UI/KeyBoards/KeyBoard';
import { Parameters, TParameter, getData } from '../datasets/dataset';
import { getTableClickRowCol, getParameterByRow } from '../helpers/tables';

interface IState {
  showModal: boolean;
  parameters: Map<string, TParameter>;
  keyBoard: string; 
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
            parameters: getData(Parameters)
        })
    }
  }

  private handlerModalShow(event: any) {
    const {row, col} = getTableClickRowCol(event);
    const p:TParameter | undefined = getParameterByRow(this.state.parameters, row);
    if (p) {
      const type = p.type || ''
      const keyBoard = this.getKeyBoardType(type);
      this.setState({
        showModal: true,
        keyBoard
      })
    }
  }

  private getKeyBoardType(ParameterType: string): string {
    switch (ParameterType) {
      case 'TBit':              return 'KeyBoardBoolean'
      case 'TFloat':  default:  return 'KeyBoardNumeric'
    }
  }

  handlerModalClose(e: any) {
    this.setState({showModal: false})
  }

  render() {
    const modal = this.state.showModal
    ? (<Modal>
        <KeyBoard keyBoardType={this.state.keyBoard} onClick={this.handlerModalClose.bind(this)}/>
      </Modal>)
    : null;

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