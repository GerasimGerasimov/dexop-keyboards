import React, {Component} from 'react'

interface IState {
  showModal: boolean;
  parameters: Map<string, TParameter>; 
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
        parameters: new Map<string, TParameter>()
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

  handlerValueOnClick(e: any) {
    console.log(e);
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    const modal = this.state.showModal ? (null) : null;

    return(
      <>
        <h1>Settings</h1>
          <div> 
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>M.U.</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody onClick = {(e)=>this.handlerValueOnClick(e)}>
                  {
                    Array.from(this.state.parameters.entries(), ([key, item]) => {
                    const  {name, value, msu} = item;
                      return (
                        <tr key={key}>
                          <td>{name}</td>
                          <td>{msu}</td>
                          <td >{value}</td>
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