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

        const menuWidth = 256
        const menuHeight = 320
        const margin = 10

        const viewportX = event.clientX
        const viewportY = event.clientY
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const x = (viewportX + menuWidth > screenWidth)
            ? screenWidth - menuWidth - margin
            : viewportX

        const y = (viewportY + menuHeight > screenHeight)
            ? screenHeight - menuHeight - margin
            : viewportY

        setMenuState({ show: true, x, y, file })
    }, [])

    const closeContextMenu = useCallback(() => {
        setMenuState((prevState) => ({
            ...prevState, show: false
        }))
    }, [])
    return { menuState, showContextMenu, closeContextMenu }
}