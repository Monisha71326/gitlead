import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE,
});

export const getLeads = () => api.get('/leads/');
export const createLead = (data) => api.post('/leads/', data);
export const updateLead = (id, data) => api.patch(`/leads/${id}/`, data);
export const deleteLead = (id) => api.delete(`/leads/${id}/`);
export const markCalled = (id) => api.post(`/leads/${id}/mark_called/`);
