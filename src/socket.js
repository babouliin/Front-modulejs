import { io } from 'socket.io-client';

// const URL = 'https://back-modulejs.herokuapp.com/8081';
const URL = 'http://localhost:8081';
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
