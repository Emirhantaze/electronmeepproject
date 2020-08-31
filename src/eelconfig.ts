export { }

declare global {
    interface Window {
        eel: Ieel;
    }
}

export interface Ieel {
    expose: Function,
    fixCode: Function
}
export const print = (S: string) => {
    console.log(S)
}

export const eel = window.eel
eel.expose(print, "print")