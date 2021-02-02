import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Content from './components/content';
import CreateRoom from './components/VideoChatApplication/CreateRoom';
import UserContextProvider from './components/contexts/UserContext';
import ConnectionContextProvider from './components/contexts/ConnectionContext';


const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ConnectionContextProvider>
          <Switch>
            <Route path='/' exact component={ CreateRoom } />
            <Route path='/room/:roomID' component={ Content } />
          </Switch>
        </ConnectionContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}


export default App;
