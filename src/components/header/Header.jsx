import React from 'react';
import { ImportProjectButton } from './header_buttons/ImportProjectButton';
import { SaveProject } from './header_buttons/SaveProject';
import { SpecsOnOffButton } from './header_buttons/SpecsOnOffButton';
const Header = () => {
    return (
        <div className='top-bar'>
            <ImportProjectButton></ImportProjectButton>
            <SaveProject></SaveProject>
            <SpecsOnOffButton></SpecsOnOffButton>
        </div>
    );
}

export default Header;
