import api from './api';

export const uploadVideo = async (formData, onProgress) => {
  const { data } = await api.post('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgress) onProgress(percentage);
    },
  });
  return data;
};

export const getAllVideos = async (params = {}) => {
  const { data } = await api.get('/videos', { params });
  return data;
};

export const getVideoById = async (id) => {
  const { data } = await api.get(`/videos/${id}`);
  return data;
};

export const deleteVideo = async (id) => {
  const { data } = await api.delete(`/videos/${id}`);
  return data;
};

export const getStreamUrl = (videoId) => {
  const token = localStorage.getItem('token');
  return `${import.meta.env.VITE_API_URL}/stream/${videoId}?token=${token}`;
};
