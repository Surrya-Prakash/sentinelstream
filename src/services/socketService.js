import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (userId) => {
  const token = localStorage.getItem('token');
  
  socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('🔌 Socket connected');
    socket.emit('join', userId);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Socket disconnected');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const onProcessingStarted = (callback) => {
  if (socket) socket.on('processingStarted', callback);
};

export const onProcessingProgress = (callback) => {
  if (socket) socket.on('processingProgress', callback);
};

export const onProcessingCompleted = (callback) => {
  if (socket) socket.on('processingCompleted', callback);
};

export const onProcessingFailed = (callback) => {
  if (socket) socket.on('processingFailed', callback);
};
