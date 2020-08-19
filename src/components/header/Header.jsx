import React from 'react';
import {ImportSimButton} from './header_buttons/ImportSimButton';
import { SpecsOnOffButton } from './header_buttons/SpecsOnOffButton';
import { SaveSimulation } from './header_buttons/SaveSimulation';
const Header = () => {
    return (
        <div className='top-bar'>
            <ImportSimButton></ImportSimButton>
            <SpecsOnOffButton></SpecsOnOffButton>
            <SaveSimulation></SaveSimulation>
        </div>
    );
}

export default Header;
