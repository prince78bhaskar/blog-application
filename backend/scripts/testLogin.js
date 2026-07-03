import axios from 'axios';

const API = 'http://localhost:3000/api';

(async () => {
  try {
    const res = await axios.post(`${API}/auth/login`, { username: '', password: '' });
    console.log('status', res.status);
    console.log(res.data);
  } catch (err) {
    if (err.response) {
      console.log('status', err.response.status);
      console.log(err.response.data);
    } else {
      console.error('error', err.message);
    }
  }
})();
