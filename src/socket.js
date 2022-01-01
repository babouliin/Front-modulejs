import { io } from 'socket.io-client';

// const URL = 'https://back-modulejs.herokuapp.com/8081';
const URL = 'http://localhost:8080';
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(`Socket ${event}`, args);
});

export default socket;
