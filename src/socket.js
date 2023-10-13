import { io } from 'socket.io-client';

import { SERVER_ROOT_URL } from "./utils/urls";

export const socket = io(SERVER_ROOT_URL);