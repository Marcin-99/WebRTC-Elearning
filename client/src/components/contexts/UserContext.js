import React, { createContext, useState } from 'react';

export const UserContext = createContext();


const UserContextProvider = (props) => {

	const [username, setUsername] = useState('')

	return (
		<UserContext.Provider value={{ username, setUsername }}>
			{ props.children }
		</UserContext.Provider>
	);
}


export default UserContextProvider;