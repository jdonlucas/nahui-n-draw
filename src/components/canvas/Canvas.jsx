import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import {useAtom} from 'jotai';
import {showGridAtom} from '../../state';

function Canvas({ color, radius }) {

     const [showGrid] = useAtom(showGridAtom)

     const firstCanvas = useRef(null);
     const  clear= () => {
       firstCanvas.current.clear();
     }
   
     const undo = () => {
       firstCanvas.current.undo();
     } 

     return(
          <div>
               
               <button onClick={clear}>
                    ALV
               </button>

               <button onClick={undo}>
                    Undo
               </button>
               
               <CanvasDraw
               key={`id-${showGrid}`}
               ref={firstCanvas}
               brushRadius={radius}
               lazyRadius={1}
               brushColor={color}
               catenaryColor='#cccc'
               hideGrid={showGrid}
               canvasHeight={window.innerHeight}
               canvasWidth={window.innerWidth}
               />
          </div>
     );
}

export default Canvas;