import React, { useEffect, useRef } from 'react';


const Video = (props) => {

    const ref = useRef();

    useEffect( () => {
        props.peer.on('stream', stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video className='video' playsInline autoPlay ref={ ref } />
    );
}


export default Video;