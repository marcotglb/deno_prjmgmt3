// questo moduleo NON deve essere usato dal modulo store.

import axios from 'axios'
import { store  } from "../store/Store";
//const store = useStore();
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = "true";
axios.defaults.headers.post['Content-Type'] = 'application/json';
//res.header("Access-Control-Allow-Origin", "true");
axios.defaults.timeout = 100000;

const http = axios.create({
    baseURL: 'http://localhost:8000',
    //headers: { Authorization: `Bearer ${store.state.credential.jwt}` },
    timeout: 8000
});


export default http;
// Add a request interceptor

http.interceptors.request.use(
    config => {
        //const store = useStore();
        console.log ('axios outgoing call intercepted. store:', store)
        if (store.state.credential.jwt) {
            console.log('jwt found.')
            config.headers['Authorization'] = `Bearer ${store.state.credential.jwt}`;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });


//Add a response interceptor
/*
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    return Promise.reject(error);
});
*/
