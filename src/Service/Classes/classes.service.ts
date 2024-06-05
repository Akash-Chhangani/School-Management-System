import axios from 'axios';

export const createClass = (obj: any) =>
  axios.post(`http://localhost:4000/classes`, obj);
