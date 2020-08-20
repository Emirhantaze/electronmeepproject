import React from 'react';
import SimContextProvider from './context/Sim';
import Header from './components/header/Header';
import Main from './components/main/Main';
import SpecsContextProvider from './context/SpecsContext';
import { FileNamesContextProvider } from './context/FileNamesContext';
import './styles/main.css'

const customTitlebar = window.require('custom-electron-titlebar');
 
window.titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#444'),
    shadow:true,
});
window.titlebar.updateMenuPosition('left');
const App = () => {
    return (
        <div style={{height:"100%"}}>
            <SpecsContextProvider>
                <SimContextProvider>
                    <FileNamesContextProvider>
                        <Header/> 
                        <Main/>
                    </FileNamesContextProvider>
                </SimContextProvider>
            </SpecsContextProvider>
        </div>
    );
}

export default App;

