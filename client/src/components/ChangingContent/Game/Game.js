import React, { useEffect, useContext, useState, useRef } from 'react';
import { ConnectionContext } from '../../contexts/ConnectionContext';
import { useCanvas } from '../../../customHooks/useCanvas';


const Game = () => {
    //https://medium.com/@martin.crabtree/react-creating-an-interactive-canvas-component-e8e88243baf6
    const { socket, setSocket } = useContext(ConnectionContext);
    const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] = useCanvas();

    const handleCanvasClick = (e) => {
        console.log(e.clientX, e.clientY);
        e.preventDefault();
        const currentCoord = { x: e.clientX - 100, y: e.clientY - 70 };
        setCoordinates([...coordinates, currentCoord]);
    }

    const handleClearCanvas = (e) => {
        e.preventDefault();
        setCoordinates([]);
    }

    return (
        <>
            <canvas
                id='gameCanvas'
                ref={ canvasRef }
                width={ canvasWidth }
                height={ canvasHeight }
                onClick={ handleCanvasClick }
            />
            <button onClick={ handleClearCanvas }>CLEAR</button>
        </>
    )
}


export default Game;