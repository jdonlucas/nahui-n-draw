import React from 'react';

export default function LeftPanel({setBrushColor, setBrushRadius, toggleHandler, showGrid}){

    const radiusHandler = (e) => {
        setBrushRadius(10);
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
                <button> 3</button>
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
