import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './ChangingContent/Game/Game';
import Stats from './ChangingContent/Stats';
import Tutorial from './ChangingContent/Tutorial';
import Navbar from './Navbar';
import VideoRoom from './VideoChatApplication/VideoRoom';


const Content = (props) => {

    const roomID = props.match.params.roomID;
    const currentUrl = '/room/' + roomID

    return (
        <BrowserRouter>
            <VideoRoom roomID={ roomID } />
            <div id='content'>
                <Navbar currentUrl={ currentUrl } />
                <div id='changingContent'>
                    <Switch>
                        <Route path={ currentUrl + '/game' } component={ Game } />
                        <Route path={ currentUrl + '/stats' } component={ Stats } />
                        <Route path={ currentUrl + '/tutorial' } component={ Tutorial } />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}


export default Content;
