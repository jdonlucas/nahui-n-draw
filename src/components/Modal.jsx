/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from 'react';
import {useAtom} from 'jotai';
import {showModal} from '../state';

export default function Modal(props) {

    const [show, setShow] = useAtom(showModal);

    return (
        <div css={css`
            display: ${show ? 'block' : 'none'};
        `}>  
            <div css={css`
                height: 100vh;
                width: 100vw;
                background: #0000008f;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 99999999999;
            `} onClick={() => setShow(!show)}></div>
            <div css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                z-index: 999999999999;
                width: 50%;
                height: 50%;
                border-radius: 7px; 
                background: #282c34;
            `}>
                {props.children}
            </div>
        </div>
    )
}