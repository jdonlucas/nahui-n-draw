/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, {useState} from 'react';
import './App.css';
import LeftPanel from './components/leftPanel/LeftPanel';
import CanvasContainer from './components/canvas/CanvasContainer';

function App() {

   //STATE
   const [color, setBrushColor] = useState("");

  return (
    <div css={css`
      display: flex;
      height: 100vh;
    `}>
      <LeftPanel 
        setBrushColor={setBrushColor}
      />
      <CanvasContainer 
        setBrushColor={setBrushColor}
      />
    </div>
  );
}

export default App;
