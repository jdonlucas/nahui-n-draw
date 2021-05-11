/** @jsx jsx */
import { jsx,css } from '@emotion/react';
import React, { useRef, createRef, Fragment, useEffect, useState } from 'react';
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

     const [scale,setScale] = useState(1);

     const firstCanvas = useRef(null);

     const  clear = () => {
       firstCanvas.current.clear();
     }
   
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
     
     var ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

     var x = color;
 
     useEffect(() => {
          if(firstCanvas && firstCanvas.current) {
               ctx = firstCanvas.current.getContext("2d");
               firstCanvas.current.addEventListener("mousemove", findxyMove);
               firstCanvas.current.addEventListener("mousedown", findxyDown);
               firstCanvas.current.addEventListener("mouseup", findxyUpOut);
               firstCanvas.current.addEventListener("mouseout", findxyUpOut);
               return () => {
                    firstCanvas.current.removeEventListener("mousemove", findxyMove);
                     firstCanvas.current.removeEventListener("mousedown", findxyDown);
                     firstCanvas.current.removeEventListener("mouseup", findxyUpOut);
                     firstCanvas.current.removeEventListener("mouseout", findxyUpOut);
               }
          }
     },[firstCanvas,scale,radius,color]);
 
 
     const draw = () => {
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(currX, currY);
          ctx.strokeStyle = x;
          ctx.lineWidth = radius;
          ctx.stroke();
          ctx.closePath();
     }
     
     const erase = () => {
          var m = confirm("Want to clear");
          if (m) {
              ctx.clearRect(0, 0, w, h);
              document.getElementById("canvasimg").style.display = "none";
          }
     }

     const findxyDown = (e) => {
          currX = (e.clientX - firstCanvas.current.offsetLeft) / scale;
          currY = (e.clientY - firstCanvas.current.offsetTop) / scale;

          flag = true;
          dot_flag = true;
          if (dot_flag) {
              ctx.beginPath();
              ctx.fillStyle = x;
              ctx.fillRect(currX, currY, 2, 2);
              ctx.closePath();
              dot_flag = false;
          }
     }
     
     const findxyUpOut = (e) => {
          flag = false;
     }
     const findxyMove = (e) => {
          if (flag) {
              prevX = currX;
              prevY = currY;
              currX = (e.clientX - firstCanvas.current.offsetLeft) / scale;
              currY = (e.clientY - firstCanvas.current.offsetTop) / scale;
              draw();
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
                                        <div onClick={erase} className="canvas-button">
                                             <FontAwesomeIcon icon={faTrashAlt} className="canvas-icon" color="white" size="lg"/>
                                        </div>

                                        <div onClick={undo} className="canvas-button">
                                             <FontAwesomeIcon icon={faUndo} className="canvas-icon" color="white" size="lg"/>
                                        </div>
                                   </div>
                                        <canvas ref={firstCanvas} id="newCanvas" width={1080} height={500} css={css`
                                             background: white;
                                             transform: scale(${scale});
                                             transform-origin: 0 0;
                                        `}></canvas>
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