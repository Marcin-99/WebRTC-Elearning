import React, { createContext, useState } from 'react';
import io from 'socket.io-client';

export const ConnectionContext = createContext();


const ConnectionContextProvider = (props) => {

	const [socket, setSocket] = useState(
		io.connect('http://localhost:8000', {
			reconnectionDelay: 1000,
			reconnection: true,
			reconnectionAttempts: 10,
			transports: ['websocket'],
			agent: false,
			upgrade: false,
			rejectUnauthorized: false
	}));

	socket.on('create-message', (message) => {
		console.log('siusiak');
	})

	return (
		<ConnectionContext.Provider value={{ socket, setSocket }}>
			{ props.children }
		</ConnectionContext.Provider>
	);
}


export default ConnectionContextProvider;