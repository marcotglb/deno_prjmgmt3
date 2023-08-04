import http from '../../lib/http';
const apiBaseUrl = '/users/login'



async function login(state, value) {
    console.log('sending login credentials ...', value)
    try {
        let res = await http.post(apiBaseUrl, {username: value.username, password: value.password})
        console.log('Answer: ', res.data)
        return res.data;
    } catch(err) {
      console.error(err);
    }
}


export default { login };