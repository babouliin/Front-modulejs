import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_API_URL;
const socket = io(URL, { autoConnect: false });

// socket.onAny((event, ...args) => {
//   // eslint-disable-next-line no-console
//   console.log(`Socket ${event}`, args);
// });

export default socket;
