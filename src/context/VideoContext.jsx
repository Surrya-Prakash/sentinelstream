import { createContext, useState } from 'react';
import * as videoService from '../services/videoService';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (params) => {
    setLoading(true);
    try {
      const data = await videoService.getAllVideos(params);
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Fetch videos error:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadVideo = async (formData, onProgress) => {
    const data = await videoService.uploadVideo(formData, onProgress);
    return data;
  };

  const updateVideoStatus = (videoId, updates) => {
    setVideos(prev => prev.map(v => 
      v._id === videoId ? { ...v, ...updates } : v
    ));
  };

  return (
    <VideoContext.Provider value={{ 
      videos, 
      currentVideo, 
      loading, 
      fetchVideos, 
      uploadVideo,
      updateVideoStatus,
      setCurrentVideo 
    }}>
      {children}
    </VideoContext.Provider>
  );
};
