import * as React from 'react'
import Sidebar from './Sidebar'
import Viewport from './Viewport'
import SpecsPanel from './SpecsPanel';


const Main = () => {
    return (
        <div className='content'>
            <Sidebar/>
            <SpecsPanel/>
            <Viewport/>
        
        </div>
    );
};
export default Main;
