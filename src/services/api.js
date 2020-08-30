import axios from 'axios';

const api = axios.create({
      baseURL: "https://vuttr-back-end.herokuapp.com"
    });

export default api;