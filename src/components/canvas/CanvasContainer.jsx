/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react'
import Canvas from './Canvas'

const CanvasContainer = () =>{

    return (
        <div css={css`
            width: calc(100vw - 57px);
            overflow: auto;
            background: gray;        
        `}>
            <Canvas />
        </div>
    )
}

export default CanvasContainer;