import axios from 'axios';

const API =axios.create({baseURL:"http://localhost:8070"})

export const logIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
