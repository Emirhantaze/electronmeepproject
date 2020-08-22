import React from 'react';
import { ImportProjectButton } from './header_buttons/ImportProjectButton';
import { SaveProject } from './header_buttons/SaveProject';
import { SpecsOnOffButton } from './header_buttons/SpecsOnOffButton';
import { SaveProjectToDiff } from './header_buttons/SaveProjectToDiff';
const Header = () => {
    return (
        <div className='top-bar'>
            <ImportProjectButton></ImportProjectButton>
            <SaveProject></SaveProject>
            <SaveProjectToDiff></SaveProjectToDiff>
            <SpecsOnOffButton></SpecsOnOffButton>
        </div>
    );
}

export default Header;
