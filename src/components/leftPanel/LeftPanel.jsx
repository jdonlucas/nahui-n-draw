import React from 'react';
import { SketchPicker } from 'react-color';
import {useAtom} from 'jotai';
import {showGridAtom, colorAtom} from '../../state';   


export default function LeftPanel({setBrushColor, setBrushRadius}){

    const [showGrid, setShowGrid] = useAtom(showGridAtom)
    const [color, setColor] = useAtom(colorAtom)

    const radiusHandler = (e) => {
        setBrushRadius(10);
    }
    const toggleHandler = () => {
        //showGrid ? setShowGrid(false) : setShowGrid(true);
        setShowGrid(!showGrid)
   }


    return ( <>
        <div className="leftPanel">
            <ul className="topContainer">
                <button onClick={radiusHandler}>
                    1
                </button>
                <button onClick={toggleHandler}> 
                    2
                    {showGrid ? console.log("1") : console.log("2")}
                </button>
                <button> <SketchPicker
                    color={ color }
                    onChangeComplete={ (color) => setColor(color.hex) }
                /></button>
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
