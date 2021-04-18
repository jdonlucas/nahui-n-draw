/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react'
import Canvas from './Canvas'

const CanvasContainer = ({setBrushColor, setBrushRadius, setShowGrid, color, radius, showGrid}) =>{

    return (
        <div css={css`
            width: calc(100vw - 57px);
        `}>
            <Canvas
             setBrushColor={setBrushColor}
             setBrushRadius={setBrushRadius}
             setShowGrid={setShowGrid}
             color={color}
             radius={radius}
             showGrid={showGrid}
            />
        </div>
    )
}

export default CanvasContainer;