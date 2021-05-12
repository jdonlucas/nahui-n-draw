/** @jsx jsx */
import { jsx,css } from '@emotion/react';
import React, { useRef, createRef, Fragment, useEffect, useState } from 'react';
import NahuiCanvas from 'nahui-react-canvas-draw';
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

     const [scale,setScale] = useState(1);

     const firstCanvas = useRef(null);
   
     const undo = () => {
       firstCanvas.current.undo();
     } 

     const downloadToSVG = () => {
          if(firstCanvas.current) {
               domtoimage.toJpeg(firstCanvas.current, { quality: 0.95 })
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
               domtoimage.toSvg(firstCanvas.current, { quality: 0.95 })
                    .then(function (dataUrl) {
                        var link = document.createElement('a');
                        link.download = 'my-image-name.svg';
                        link.href = dataUrl;
                        link.click();
                    });
          }
     }
     

     const onZoom = (n) => {
          if (n > 0) {
               setScale(scale * 1.2) 
          }
          else {
               setScale(scale / 1.2)
          }
     }
          

     return(
          <>
               <div css={css`
                  width: fit-content;
               `}>
                              <Fragment>
                                   <div className="canvasButton-container tools">
                                        <div onClick={() => onZoom(1)} className="canvas-button">
                                             <FontAwesomeIcon icon={faPlus} className="canvas-icon" color="white" size="lg"/>
                                        </div>
                                        <div onClick={() => onZoom(-1)} className="canvas-button">
                                             <FontAwesomeIcon icon={faMinus} className="canvas-icon" color="white" size="lg"/>
                                        </div>
                                        <div className="canvas-button">
                                             <FontAwesomeIcon icon={faTrashAlt} className="canvas-icon" color="white" size="lg"/>
                                        </div>

                                        <div onClick={undo} className="canvas-button">
                                             <FontAwesomeIcon icon={faUndo} className="canvas-icon" color="white" size="lg"/>
                                        </div>
                                   </div>
                                        <NahuiCanvas scale={scale} brushSize={radius} color={color} />
                              </Fragment>
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