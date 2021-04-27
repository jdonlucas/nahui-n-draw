/** @jsx jsx */
import { css,jsx } from '@emotion/react';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import {useAtom} from 'jotai';
import {showGridAtom, colorAtom, radiusAtom} from '../../state';   


export default function LeftPanel(){

    const [color, setColor] = useAtom(colorAtom)
    const [radius, setRadius] = useAtom(radiusAtom)

    const [showColor, setShowColor] = useState(false);
    const [showBrushSize, setShowBrushSize] = useState(false);


    const radiusHandler = (e) => {
        console.log(e.target.value);
        setRadius(e.target.value);
    }

    const eraserHandler = (e) => {
        setColor("#FFFF");
        setRadius(10);
    }


    return ( <>
        <div className="leftPanel">
            <ul className="topContainer">
                <button onClick={() => setShowBrushSize(!showBrushSize)} className="leftPanel-Button">
                    Size
                </button>
                <div css={css`
                    position: absolute;
                    z-index: 9999999;
                    right: -268px;
                    top: 45px;
                    display: ${showBrushSize ? 'block' : 'none'};
                `}>
                    <input onChange={radiusHandler} type="range" min="1" max="20" />
                </div>

                <button onClick={() => setShowColor(!showColor)} className="leftPanel-Button"> 
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
                <button onClick={eraserHandler} className="leftPanel-Button"> 
                    Eraser
                </button>
                <button className="leftPanel-Button"> 5</button>
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
