import * as React from 'react';
import { Component, createContext } from 'react'


export const SimContext = createContext();

class SimContextProvider extends Component {
  state =  {
    sim: {}
  }
  setterSim = (meep) =>{
    this.setState({
      sim:meep
    })
  }

  render() { 
    return (
      <SimContext.Provider value={
        {
          sim:this.state.sim, 
          simSetter: this.setterSim,

        }}>
        {this.props.children}
      </SimContext.Provider>
    );
  }
}
 
export default SimContextProvider;




