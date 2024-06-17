import axios from 'axios';

export const createClassRoom = (obj: any) =>
  axios.post(`http://localhost:4000/classsubjectmapping`, obj);
