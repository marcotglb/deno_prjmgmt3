import axios from 'axios'
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = "true";
axios.defaults.headers.post['Content-Type'] = 'application/json';
//res.header("Access-Control-Allow-Origin", "true");
axios.defaults.timeout = 100000;

const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 8000
  });


export default http;
// Add a request interceptor
/*
axios.interceptors.request.use(
    config => {
        const token = 'localStorageService.getAccessToken()';
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYxMzk5MDE5MiwiZXhwIjoxNjE2NTgyMTkyLCJuYmYiOjE2MTM5OTAxOTIsImp0aSI6IkNvMGU4emtMTnE3Q2hIcWciLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ssafhxfR5bhTrnX5Wph2feMkHGCLOtJ_4TiEZwrJ1i8';
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });


//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error);
});
*/