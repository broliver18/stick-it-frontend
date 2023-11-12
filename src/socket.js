import { io } from 'socket.io-client';

const socket = new io(process.env.REACT_APP_SERVER_URL, {
    withCredentials: true,
});

export default socket;