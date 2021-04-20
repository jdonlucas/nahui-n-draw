import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import {useAtom} from 'jotai';
import {colorAtom} from '../../state';


function Canvas({ radius }) {

     const [color] = useAtom(colorAtom)

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
               brushRadius={radius}
               lazyRadius={1}
               brushColor={color}
               catenaryColor='#3c3c3c'
               hideGrid={true}
               canvasHeight={window.innerHeight}
               canvasWidth={window.innerWidth}
               />
          </div>
     );
}

export default Canvas;