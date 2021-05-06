/** @jsx jsx */
import { css,jsx } from '@emotion/react';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import {useAtom} from 'jotai';
import {showGridAtom, colorAtom, radiusAtom, showModal} from '../../state';
//FontAwesome
import { faPencilAlt, faPalette, faEraser, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function LeftPanel(){

    const [color, setColor] = useAtom(colorAtom)
    const [radius, setRadius] = useAtom(radiusAtom)
    const [show, setShow] = useAtom(showModal);

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
                <div onClick={() => setShowBrushSize(!showBrushSize)} className="leftPanel-Button">
                    <FontAwesomeIcon icon={faPencilAlt} className="leftPanel-icon" color="white" size="2x"/>
                </div>
                <div css={css`
                    position: absolute;
                    z-index: 9999999;
                    right: -15rem;
                    top: 2rem;
                    border-radius: 2px;
                    box-shadow: 1px 1px 2px rgb(0 0 0 / 30%);
                    display: ${showBrushSize ? 'block' : 'none'};
                `}>
                    Brush Size
                    <input onChange={radiusHandler} type="range" min="1" max="20" step="1" className="input-brushSize"/>
                </div>

                <div onClick={() => setShowColor(!showColor)} className="leftPanel-Button"> 
                    <FontAwesomeIcon icon={faPalette} className="leftPanel-icon" color="white" size="2x"/>
                </div>
                <div css={css`
                    position: absolute;
                    z-index: 9999999;
                    right: -15rem;
                    top: 45px;
                    display: ${showColor ? 'block' : 'none'};
                `}>
                    <ChromePicker
                            color={ color }
                            onChangeComplete={ (color) => setColor(color.hex) }
                        />
                </div>

                <div onClick={eraserHandler} className="leftPanel-Button"> 
                    <FontAwesomeIcon icon={faEraser} className="leftPanel-icon" color="white" size="2x"/>
                </div>
            </ul>
            <ul className="bottomContainer">
                <div onClick={() => setShow(!show)} className="leftPanel-Button"> 
                    <FontAwesomeIcon icon={faSave} className="leftPanel-icon" color="white" size="2x"/>
                </div>
            </ul>
        </div>
    </> )
}; 
