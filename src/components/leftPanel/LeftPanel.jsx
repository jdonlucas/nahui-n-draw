/** @jsx jsx */
import { css,jsx } from '@emotion/react';
import React, { useState } from 'react';
import {useAtom} from 'jotai';
import {showGridAtom, colorAtom, radiusAtom, showModal} from '../../state';

//FontAwesome
import { faPencilAlt, faPalette, faEraser, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Color picker
import { ColorPicker, useColor } from "react-color-palette";


export default function LeftPanel(){

    const [color, setColor] = useAtom(colorAtom)
    const [radius, setRadius] = useAtom(radiusAtom)
    const [show, setShow] = useAtom(showModal);

    const [showColor, setShowColor] = useState(false);
    const [showBrushSize, setShowBrushSize] = useState(false);

    const [colorSelection, setColorSelection] = useColor("hex", color);

    const radiusHandler = (e) => {
        setRadius(e.target.value);
    }

    const eraserHandler = (e) => {
        setColor("#FFFF");
        //setColorSelection("hex", "#FFFF")
        setRadius(10);
    }

    const changeTool = (tool) => {
        if(tool == 'color') {
            setShowColor(!showColor);
            setShowBrushSize(false);
        } else if (tool == 'brush') {
            setShowBrushSize(!showBrushSize);
            setShowColor(false);
        } else if (tool == 'erase' || tool == 'save') {
            setShowColor(false);
            setShowBrushSize(false);
        }

    }


    return ( 
        <>
            <div className="leftPanel">
                <ul className="topContainer">
                    <div onClick={() => changeTool('brush')} className="leftPanel-Button">
                        <FontAwesomeIcon icon={faPencilAlt} className="leftPanel-icon" color="white" size="2x"/>
                    </div>
                    <div onClick={() => changeTool('color')} className="leftPanel-Button"> 
                        <FontAwesomeIcon icon={faPalette} className="leftPanel-icon" color="white" size="2x"/>
                    </div>
                    <div onClick={() => {eraserHandler();changeTool('erase')}} className="leftPanel-Button"> 
                        <FontAwesomeIcon icon={faEraser} className="leftPanel-icon" color="white" size="2x"/>
                    </div>
                </ul>
                <ul className="bottomContainer">
                    <div onClick={() => {setShow(!show);changeTool('save')}} className="leftPanel-Button"> 
                        <FontAwesomeIcon icon={faSave} className="leftPanel-icon" color="white" size="2x"/>
                    </div>
                </ul>
            </div>
            <div className="leftPanelTools">
                    <div css={css`
                        position: absolute;
                        z-index: 9999999;
                        top: 2rem;
                        border-radius: 2px;
                        box-shadow: 1px 1px 2px rgb(0 0 0 / 30%);
                        display: ${showBrushSize ? 'block' : 'none'};
                    `}>
                        Brush Size
                        <input onChange={radiusHandler} type="range" min="1" max="20" step="1" value={radius} className="input-brushSize"/>
                    </div>
                    <div css={css`
                        position: absolute;
                        z-index: 9999999;
                        top: 45px;
                        display: ${showColor ? 'block' : 'none'};
                    `}>
                        <ColorPicker width={456} height={228} color={colorSelection} onChange={(color) => {setColorSelection(color);setColor(color.hex)} } hideHSV dark />
                    </div>
            </div>
        </> 
    )
}; 
