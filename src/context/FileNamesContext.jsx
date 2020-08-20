import React, {createContext} from 'react'
import { useState } from 'react'

export const FileNamesContext = createContext()

export const FileNamesContextProvider = (props) => {
    const [currentProjectPath,currentProjectPathSetter] = useState(undefined)
    return (
        <FileNamesContext.Provider value={{
            currentProjectPath : currentProjectPath,
            currentProjectPathSetter : currentProjectPathSetter}
        }>
            {props.children}
        </FileNamesContext.Provider>
    )
}
