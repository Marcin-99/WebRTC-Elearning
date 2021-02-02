import React, { useEffect, useState, useRef } from 'react';
import { draw } from '../components/ChangingContent/Game/utils';

export const canvasWidth = window.innerWidth * .8;
export const canvasHeight = window.innerHeight * .8;


export const useCanvas = () => {
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    
    useEffect( () => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        coordinates.forEach((coordinate) => {draw(ctx, coordinate)});
    })


    return [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ];
}