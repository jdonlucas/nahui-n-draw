/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react'
import Canvas from './Canvas'

const CanvasContainer = ({setBrushColor, setBrushRadius, color, radius}) =>{

    return (
        <div css={css`
            width: calc(100vw - 57px);
        `}>
            <Canvas
             setBrushColor={setBrushColor}
             setBrushRadius={setBrushRadius}
             color={color}
             radius={radius}
            />
        </div>
    )
}

export default CanvasContainer;