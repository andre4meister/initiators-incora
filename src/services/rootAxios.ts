import axios from 'axios';

const rootAxios = axios.create({
  baseURL: 'https://initiators-ua.herokuapp.com/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
  },
});

export default rootAxios;
