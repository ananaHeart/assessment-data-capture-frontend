// src/services/api.js
import axios from 'axios';

// This creates a reusable instance of axios with our backend's base URL.
// This way, we don't have to type 'http://localhost:3001/api' in every API call.
const api = axios.create({
  baseURL: 'https://assessment-backend-api-202843053880.asia-southeast1.run.app/api', // <-- Update this to your backend's URL
});

export default api;
