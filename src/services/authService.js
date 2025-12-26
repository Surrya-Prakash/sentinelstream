import api from './api';

export const register = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data.user;
};
