import { useState, useCallback } from "react";

export const useContextMenu = () => {
    const [menuState, setMenuState] = useState({
        show: false,
        x: 0,
        y: 0,
        file: null,
    })

    const showContextMenu = useCallback((event, file) => {
        event.preventDefault();
        const x = event.pageX
        const y = event.pageY
        setMenuState({ show: true, x, y, file })
    }, [])

    const closeContextMenu = useCallback(() => {
        setMenuState((prevState) => ({
            ...prevState, show: false
        }))
    }, [])
    return {menuState, showContextMenu, closeContextMenu}
}