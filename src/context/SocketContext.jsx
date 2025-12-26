import { createContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useVideo } from '../hooks/useVideo';
import * as socketService from '../services/socketService';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const { updateVideoStatus } = useVideo();

  useEffect(() => {
    if (user) {
      const socket = socketService.connectSocket(user.id);

      socketService.onProcessingStarted((data) => {
        console.log('Processing started:', data);
        updateVideoStatus(data.videoId, { status: 'processing' });
      });

      socketService.onProcessingProgress((data) => {
        console.log('Processing progress:', data);
        updateVideoStatus(data.videoId, { 
          processingProgress: data.progress,
          status: data.status 
        });
      });

      socketService.onProcessingCompleted((data) => {
        console.log('Processing completed:', data);
        updateVideoStatus(data.videoId, { 
          status: 'completed',
          sensitivityResult: data.sensitivityResult 
        });
      });

      socketService.onProcessingFailed((data) => {
        console.log('Processing failed:', data);
        updateVideoStatus(data.videoId, { status: 'failed' });
      });

      return () => {
        socketService.disconnectSocket();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{}}>
      {children}
    </SocketContext.Provider>
  );
};
