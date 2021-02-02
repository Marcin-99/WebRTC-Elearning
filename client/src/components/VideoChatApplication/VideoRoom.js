import React, { useEffect, useRef, useState, useContext } from 'react';
import Peer from 'simple-peer';
import Video from './Video';
import TextChat from './TextChat';
import { ConnectionContext } from '../contexts/ConnectionContext';


const VideoRoom = (props) => {
    
    const { socket, setSocket } = useContext(ConnectionContext);

    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.roomID;

    useEffect( () => {
        const videoConstraints = {
            height: window.innerHeight / 2,
            width: window.innerWidth / 2
        };
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socket.emit('join room', roomID);
            socket.on('all users', users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socket.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socket.on('user joined', payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socket.on('receiving returned signal', payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    const createPeer = (userToSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on('signal', signal => {
            socket.emit('sending signal', { userToSignal, callerID, signal })
        })

        return peer;
    }

    const addPeer = (incomingSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on('signal', signal => {
            socket.emit('returning signal', { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <>
            <div id='videoChatSection'>
                    <video className='video' muted ref={ userVideo } autoPlay playsInline />
                    { peers.map((peer, index) => {
                        return (
                            <Video className='video' key={ index } peer={ peer } />
                        );
                    })}
                    <TextChat />
            </div>
        </>
    );
};


export default VideoRoom;
