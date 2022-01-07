import Chat, {Bubble, Button, Notice, useMessages} from '@chatui/core';
import '@chatui/core/dist/index.css';
import {useEffect, useRef, useState} from "react";
import NoticeSection from "./NoticeSection";

const ChatScene = () => {
    const { messages, appendMsg, setTyping } = useMessages([]);
    const waitInterval = useRef(-1);
    const msgInterval  = useRef(-1);
    const lastId       = useRef(-1);
    const [ roomId, setRoomId ] = useState('loading');
    const [ notice, setNotice ] = useState([])
    const {id, setId} = useState('');
    const init = useRef(true);

    const defaultQuickReplies = [
        {
            name: '離開',
            type: "exit"
        },
        {
            icon: 'message',
            name: '联系人工服务',
            isNew: true,
            isHighlight: true,
            type: "text"
        }
    ];

    function handleQuickReplyClick(item) {
        handleSend(item.type, item.name);
    }

    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            sendMsg(val).then()
        } else if (type === 'exit'){
            leaveRoom().then();
        }
    }

    const leaveRoom = async () => {
        let res = await axios.post('/api/leave', {  withCredentials: true })
        window.alert('離開啦 找找下一個吧')
    }

    const joinRoom = async () => {
        let res = await axios.post('/api/join', {  withCredentials: true })
        //console.log(res.data)
        console.log(res.data?.users?.length)
        if(res.data?.users?.length === 2){
            window.alert("找到聊天對象啦^^ 請記得離開前幫我按一下「離開」🥺")
            setRoomId(res.data.id)
            clearInterval(waitInterval.current)
        }
    }

    useEffect(() => {
        if (init.current) {
            init.current = false;

            const fetchData = async () => {
                //let res = await axios.get('/api/session')
                //console.log(res.data)

                let res = await axios.get('/api/cms/notice')
                console.log(res.data)
                res?.data?.forEach(r=>{
                    setNotice(old => [...old, r]);
                })
            };
            fetchData().then();

            waitInterval.current = setInterval(joinRoom, 1000)
            msgInterval.current  = setInterval(fetchMsg, 1000)
        }
    }, []);

    function renderMessageContent(msg) {
        const {content} = msg;
        return <Bubble content={content.text}/>;
    }

    const sendMsg  = async (msg) => {
        console.log(msg)
        let res = await axios.post('/api/send', {
            msg
        } ,{ withCredentials: true})

        setTyping(true);
    }

    const fetchMsg = async () => {
        let res = await axios.post('/api/get', {
            lastId: lastId.current
        } ,{ withCredentials: true})

        if(res?.data?.status === "error"){
            window.alert('對方離開了餒')
            clearInterval(msgInterval.current)
            return;
        }

        res.data?.all?.forEach(m=>{
            appendMsg({
                type: 'text',
                content: { text: m?.content?.content ?? "目前版本不支援此訊息" },
                position: m?.position,
                createdAt: m?.created_at
            });
        })

        lastId.current = res.data?.lastId;
    }


    return (
        <>
            <NoticeSection notices={notice}/>
            <Chat
                navbar={{ title: `聊天室(${roomId})` }}
                messages={messages}
                renderMessageContent={renderMessageContent}
                onSend={handleSend}
                quickReplies={defaultQuickReplies}
                onQuickReplyClick={handleQuickReplyClick}
            />
        </>
    );
};
export default ChatScene;
