import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

function Canvas() {

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
               ref={firstCanvas}
               brushRadius={1}
               lazyRadius={5}
               brushColor='#444'
               catenaryColor='#cccc'
               hideGrid={false}
               canvasHeight={window.innerHeight}
               canvasWidth={window.innerWidth}
               
               />
          </div>
     );
}

export default Canvas;