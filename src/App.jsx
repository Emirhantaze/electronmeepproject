import React from 'react';
import SimContextProvider from './context/Sim';
import Header from './components/header/Header';
import Main from './components/main/Main';
import SpecsContextProvider from './context/SpecsContext';


const App = () => {
    return (
        <div style={{height:"100%"}}>
            <SpecsContextProvider>
            <SimContextProvider>
               <Header/> 
               <Main/>
            </SimContextProvider></SpecsContextProvider>
        </div>
    );
}

export default App;

