import React, { useState, useContext, useEffect } from 'react';
import { ConnectionContext } from '../contexts/ConnectionContext';
import { UserContext } from '../contexts/UserContext';
import { v1 as uuid } from 'uuid';


const TextChat = () => {

    const { socket } = useContext(ConnectionContext);
    const { username } = useContext(UserContext);
    const [ messages, setMessages ] = useState([]);

    useEffect( () => {
        socket.on('createMessage', (payload) => {
            setMessages([...messages, payload])
        })
    })

    const sendMessage = (e) => {
        if (e.which === 13 && e.target.value.length !== 0) {
            e.preventDefault();
            socket.emit('message', {
                id: uuid(),
                message: e.target.value,
                username: username
            });
            e.target.value = '';
        }
    }

    return (
        <div id='textChat'>
            <h5 id='chatTitle'>Chat</h5>
            {
                messages.map( message => {
                    return(
                        <li key={ message.id } className='message'>
                            <b className='textUsername'>{ message.username }</b>
                            <br/>
                            { message.message }
                        </li>
                    )
                })
            }
            <input onKeyDown={ e => sendMessage(e) } id='textChatInput' placeholder='Type message here...' />
        </div>
    );
};


export default TextChat;
