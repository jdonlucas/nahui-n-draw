/** @jsx jsx */
import { css,jsx } from '@emotion/react';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import {useAtom} from 'jotai';
import {showGridAtom, colorAtom} from '../../state';   


export default function LeftPanel({setBrushColor, setBrushRadius}){

    const [showGrid, setShowGrid] = useAtom(showGridAtom)
    const [color, setColor] = useAtom(colorAtom)

    const [showColor, setShowColor] = useState(false);

    const radiusHandler = (e) => {
        setBrushRadius(10);
    }


    return ( <>
        <div className="leftPanel">
            <ul className="topContainer">
                <button onClick={radiusHandler}>
                    1
                </button>
                <button onClick={() => setShowColor(!showColor)}> 
                    Color
                </button>
                <div css={css`
                    position: absolute;
                    z-index: 9999999;
                    right: -268px;
                    top: 45px;
                    display: ${showColor ? 'block' : 'none'};
                `}>
                    <ChromePicker
                            color={ color }
                            onChangeComplete={ (color) => setColor(color.hex) }
                        />
                </div>
                <button> 4</button>
                <button> 5</button>
            </ul>
            <ul className="bottomContainer">
                <button> 6</button>
                <button> 7</button>
                <button> 8</button>
                <button> 9</button>
                <button> 10</button>
            </ul>
        </div>
    </> )
}; 
