/** @jsx jsx */
import { jsx,css } from '@emotion/react';
import React, { useRef, createRef, Fragment } from 'react';
import CanvasDraw from 'react-canvas-draw';
import {useAtom} from 'jotai';
import {colorAtom, radiusAtom} from '../../state';
import domtoimage from 'dom-to-image-more';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
//FontAwesome
import { faTrashAlt, faUndo, faPlus, faMinus,
     faFilePdf, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from '../Modal';

function Canvas() {

     const [color] = useAtom(colorAtom)
     const [radius] = useAtom(radiusAtom)

     const firstCanvas = useRef(null);

     const options = {
          minScale: 0.5,
          limitToBounds: false,
     }
     const wheel = {
          disabled: true
     }
     const pan = {
          disabled: true
     }
     const padding = {
          size: 4
     }

     const  clear = () => {
       firstCanvas.current.clear();
     }
   
     const undo = () => {
       firstCanvas.current.undo();
     } 

     const downloadToSVG = () => {
          if(firstCanvas.current) {
               domtoimage.toJpeg(firstCanvas.current.canvas.drawing, { quality: 0.95 })
                    .then(function (dataUrl) {
                        var link = document.createElement('a');
                        link.download = 'my-image-name.jpeg';
                        link.href = dataUrl;
                        link.click();
                    });
          }
     }
     const downloadToJPEG = () => {
          if(firstCanvas.current) {
               domtoimage.toSvg(firstCanvas.current.canvas.drawing, { quality: 0.95 })
                    .then(function (dataUrl) {
                        var link = document.createElement('a');
                        link.download = 'my-image-name.svg';
                        link.href = dataUrl;
                        link.click();
                    });
          }
     }
     console.log(typeof window.innerHeight)

     return(
          <>
               <div css={css`
                  background: gray;
                  width: fit-content;
               `}>
                    <TransformWrapper 
                         defaultScale={0.5}
                         defaultPositionX={0}
                         defaultPositionY={0}
                         options={options}
                         wheel={wheel}
                         pan={pan}
                         scalePadding={padding}>
                         {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                              <Fragment>
                                   <div className="canvasButton-container tools">
                                        <div onClick={zoomIn} className="canvas-button">
                                             <FontAwesomeIcon icon={faPlus} className="canvas-icon" color="white" size="lg"/>
                                        </div>
                                        <div onClick={zoomOut} className="canvas-button">
                                             <FontAwesomeIcon icon={faMinus} className="canvas-icon" color="white" size="lg"/>
                                        </div>
                                        <div onClick={clear} className="canvas-button">
                                             <FontAwesomeIcon icon={faTrashAlt} className="canvas-icon" color="white" size="lg"/>
                                        </div>

                                        <div onClick={undo} className="canvas-button">
                                             <FontAwesomeIcon icon={faUndo} className="canvas-icon" color="white" size="lg"/>
                                        </div>
                                   </div>
                                   <TransformComponent>
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
                                   </TransformComponent>
                              </Fragment>
                         )}
                    </TransformWrapper>
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