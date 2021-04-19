import React, { useRef, useEffect, useCallback} from 'react';
import CanvasDraw from 'react-canvas-draw';
import {useAtom} from 'jotai';
import {showGridAtom, drawDataAtom} from '../../state';


function Canvas({ color, radius }) {



     const [showGrid] = useAtom(showGridAtom)
     const [drawData, setDrawData] = useAtom(drawDataAtom)

     const firstCanvas = useRef(null);

     const  clear= () => {
       firstCanvas.current.clear();
     }
   
     const undo = () => {
       firstCanvas.current.undo();
     } 


     const drawCallback = useCallback(() =>{
          setDrawData(firstCanvas.current.lines)
     })

     useEffect(() => {
          firstCanvas.current.lines = drawData;
     })

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
               onChange={drawCallback}
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