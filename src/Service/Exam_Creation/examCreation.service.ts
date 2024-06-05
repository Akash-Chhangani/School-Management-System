import axios from 'axios';

export const createExam = (obj: any) =>
  axios.post(`http://localhost:4000/exam`, obj);
