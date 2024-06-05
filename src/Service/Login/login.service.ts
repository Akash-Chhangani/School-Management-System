import axios from 'axios';

export const createLogin = (obj: any) =>
  axios.post(`http://localhost:3003/auth/login`, obj);
