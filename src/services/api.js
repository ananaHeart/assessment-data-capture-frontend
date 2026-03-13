// // src/services/api.js
// import axios from 'axios';

// // This creates a reusable instance of axios with our backend's base URL.
// // This way, we don't have to type 'http://localhost:3001/api' in every API call.
// const api = axios.create({
//   baseURL: 'https://assessment-data-capture-app.onrender.com/api', // <-- Update this to your backend's URL
// });

// export default api;

// import axios from 'axios';

// // This creates a reusable instance of axios with our backend's base URL.
// // This way, we don't have to type 'http://localhost:3001/api' in every API call.
// const api = axios.create({
//   baseURL: 'http://localhost:3001/api', // <-- Update this to your backend's URL
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


export default api;

