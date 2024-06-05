import axios from 'axios';

export const createStudents = (obj: any) =>
  axios.post(`http://localhost:4000/student`, obj);
