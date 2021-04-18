/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, {useState} from 'react';
import './App.css';
import LeftPanel from './components/leftPanel/LeftPanel';
import CanvasContainer from './components/canvas/CanvasContainer';

function App() {

   //STATE
   const [color, setBrushColor] = useState("");
   const [radius, setBrushRadius] = useState(1);
   const [showGrid, setShowGrid] = useState(false);

   const toggleHandler = () => {
     showGrid ? setShowGrid(false) : setShowGrid(true);
}


  return (
    <div css={css`
      display: flex;
      height: 100vh;
    `}>
      <LeftPanel 
        setBrushColor={setBrushColor}
        setBrushRadius={setBrushRadius}
        setShowGrid={setShowGrid}
        showGrid={showGrid}
        toggleHandler={toggleHandler}
      />
      <CanvasContainer 
        setBrushColor={setBrushColor}
        setBrushRadius={setBrushRadius}
        setShowGrid={setShowGrid}
        showGrid={showGrid}
        radius={radius}
      />
    </div>
  );
}

export default App;
