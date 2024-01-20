// api.js
import axios from 'axios';

const API_BASE_URL = 'https://api2.helperplace.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCandidates = async (params:{}) => {
  try {
    const response = await api.get('/mobile/candidate/FindCandidate', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
