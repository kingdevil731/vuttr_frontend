import axios from 'axios';

const api = () => {
    return axios.create({
      baseURL: "https://vuttr-back-end.herokuapp.com"
    });
}

export default api;