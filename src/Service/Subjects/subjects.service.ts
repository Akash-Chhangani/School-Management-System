import axios from 'axios';

export const createSubjects = (obj: any) =>
  axios.post(`http://localhost:4000/subject`, obj);
