const { createGameState, gameLoop } = require('./game');
const { frameRate } = require('./constants');
require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const users = {};
const socketToRoom = {};


io.on('connection', socket => {
    socket.on('join room', roomID => {
        socket.join(roomID);
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit('room full');
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit('all users', usersInThisRoom);

        socket.on('message', (payload) => {
            io.to(roomID).emit('createMessage', payload);
        })

        const state = createGameState();
        startGameInterval(socket, state, roomID);
    });

    socket.on('sending signal', payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on('returning signal', payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });
});


const startGameInterval = (socket, state, roomID) => {
    const intervalId = setInterval(() => {
        const winner = gameLoop(state);

        if (!winner) {
            socket.emit('gameState', {gameState: JSON.stringify(state)});
            console.log('jeje');
        } else {
            io.to(roomID).emit('gameOver');
            clearInterval(intervalId);
        }
    }, 1000/frameRate)
}


server.listen(process.env.PORT || 8000, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    transport: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});