import React, { useContext, useState, useEffect } from 'react';
import { v1 as uuid } from 'uuid';
import { UserContext } from '../contexts/UserContext';


const CreateRoom = (props) => {

    const { setUsername } = useContext(UserContext);
    const [roomID, setRoomID] = useState('');

    const create = (e) => {
        e.preventDefault();
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    const join = (e) => {
        e.preventDefault();
        props.history.push(`/room/${roomID}`);
    }

    return (
        <div id='welcomeSection'>
            <label className='welcomeLabel' htmlFor='usernameInput'>What is your name?</label>
            <input onChange={ e => {setUsername(e.target.value)} } id='usernameInput' />
            <br/>
            <button className='welcomeButton' onClick={ e => create(e) }>Create room</button>
            
            <span className='welcomeLabel'>or...</span>
            <input onChange={ e => {setRoomID(e.target.value)} } id='usernameInput' />
            <button className='welcomeButton' onClick={ e => join(e) }>Join room</button>
        </div>
    );
};


export default CreateRoom;
