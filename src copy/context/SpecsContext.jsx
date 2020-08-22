import * as React from 'react';
import { Component, createContext } from 'react'


export const SpecsContext = createContext();

class SpecsContextProvider extends Component {
  state =  {
    selected:false,
    specsonoff:false,
    selectedText:""
  }
  specsonoffSetter = (param) =>{
    this.setState({
      specsonoff:param
    })
  }
  selectedSetter = (param) =>{
    this.setState({
      selected:param
    })
  }
  selectedTextSetter = (param) =>{
    this.setState({
      selectedText:param
    })
  }
  render() { 
    return (
      <SpecsContext.Provider value={
        {
          selected:this.state.selected,
          selectedSetter:this.selectedSetter,
          selectedText:this.state.selectedText,
          selectedTextSetter:this.selectedTextSetter,
          specsonoff:this.state.specsonoff,
          specsonoffSetter: this.specsonoffSetter
        }}>
        {this.props.children}
      </SpecsContext.Provider>
    );
  }
}
 
export default SpecsContextProvider;




