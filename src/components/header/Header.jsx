import React from 'react';
import { ImportProjectButton } from './header_buttons/ImportProjectButton';
import { SaveProject } from './header_buttons/SaveProject';
import { SpecsOnOffButton } from './header_buttons/SpecsOnOffButton';
import { SaveProjectToDiff } from './header_buttons/SaveProjectToDiff';
import { useDispatch } from 'react-redux';
import { addMenuonoffSetter } from '../../Slices/addMenuSlice';
const Header = () => {
    const dispatch = useDispatch()
    return (
        <div className='top-bar'>
            <ImportProjectButton></ImportProjectButton>
            <SaveProject></SaveProject>
            <SaveProjectToDiff></SaveProjectToDiff>
            <SpecsOnOffButton></SpecsOnOffButton>
            <div
                className="horizontal-button noselect"
                onClick={() => {
                    window.eel.meep_test("test", "/home/emirhantaze/test.py")
                }}
            >Meep Test</div>
            <div className="horizontal-button noselect" onClick={() => {
                window.eel.meep_kill()
            }}>
                Meep Kill
            </div>
            <div className="horizontal-button noselect"
                onClick={() => {
                    dispatch(addMenuonoffSetter())
                }}>AddMenu</div>
        </div>
    );
}

export default Header;
