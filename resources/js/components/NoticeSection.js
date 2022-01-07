import Chat, {Bubble, Button, Notice, useMessages} from '@chatui/core';
import '@chatui/core/dist/index.css';
import {useEffect, useRef, useState} from "react";

const NoticeSection = (props) => {
    const init = useRef(true);

    return (
        <>
            {props.notices.map(r=>{
                return <Notice content={r?.content} key={r?.id}/>
            })}
        </>
    );
};
export default NoticeSection;
