import axios from 'axios';

export const createMail = (obj: any) =>
  axios.post(`http://localhost:3003/mail`, obj);
