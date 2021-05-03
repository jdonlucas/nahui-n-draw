/** @jsx jsx */
import { jsx,css } from '@emotion/react';
import React, { useRef, createRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import {useAtom} from 'jotai';
import {colorAtom, radiusAtom} from '../../state';
import domtoimage from 'dom-to-image-more';
//FontAwesome
import { faTrashAlt, faUndo, faFilePdf, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from '../Modal';

function Canvas() {

     const [color] = useAtom(colorAtom)
     const [radius] = useAtom(radiusAtom)

     const firstCanvas = useRef(null);

     const  clear= () => {
       firstCanvas.current.clear();
     }
   
     const undo = () => {
       firstCanvas.current.undo();
     } 

     const downloadToSVG = () => {
          if(firstCanvas.current) {
               console.log(firstCanvas.current.canvas.drawing)
               domtoimage.toJpeg(firstCanvas.current.canvas.drawing, { quality: 0.95 })
                    .then(function (dataUrl) {
                         console.log("sdfs")
                        var link = document.createElement('a');
                        link.download = 'my-image-name.jpeg';
                        link.href = dataUrl;
                        link.click();
                    });
          }
     }
     const downloadToJPEG = () => {
          if(firstCanvas.current) {
               domtoimage.toSvg(firstCanvas.current)
                    .then(function (dataUrl) {
                        var link = document.createElement('a');
                        link.download = 'my-image-name.svg';
                        link.href = dataUrl;
                        link.click();
                    });
          }
     }


     return(
          <>
               <div>

                    <button onClick={clear}>
                         <FontAwesomeIcon icon={faTrashAlt} />
                    </button>

                    <button onClick={undo}>
                         <FontAwesomeIcon icon={faUndo} />
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
               <Modal>
                    <div css={css`
                         display: flex;
                         height: 100%;
                    `}>
                         <div className={"button-download"} onClick={downloadToSVG}>
                              <FontAwesomeIcon icon={faFilePdf} size="6x"/>
                         </div>
                         <div className={"button-download"} onClick={downloadToJPEG}>
                              <FontAwesomeIcon icon={faFileImage} size="6x"/>
                         </div>
                    </div>
               </Modal>
          </>
     );
}

export default Canvas;