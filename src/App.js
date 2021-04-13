/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import './App.css';
import LeftPanel from './components/leftPanel/LeftPanel';
import CanvasContainer from './components/canvas/CanvasContainer';

function App() {
  return (
    <div css={css`
      display: flex;
      height: 100vh;
    `}>
      <LeftPanel />
      <CanvasContainer />
    </div>
  );
}

export default App;
