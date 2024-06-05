import axios from 'axios';

export const createClassRoom = (obj: any) =>
  axios.post(`http://localhost:3003/company`, obj);
