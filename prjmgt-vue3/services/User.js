
import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 100000;


export default class User {

    constructor(value) {
        if (value)
          this.value = value;
        return this;
    }

    async get(filter) {
        console.log('User.get(filter). filter=', filter)
        try {
            let res = await axios.get('http://localhost:8000/users', { params: filter });
            console.log(res)
            return res.data;
        } catch (err) {
            console.error(err)
        }
        return null;
    }

    async upd (value, filter) {
        //this.value = value;
        //this.filter = filter;
        console.log('updating user...')
        try {
            let res = await axios.patch('http://localhost:8000/users', {value: value, filter: filter});
            console.log(res)
            return res.data;
        } catch (err) {
            console.error(err)
        }
        return null;
    }

    async updOne (value, key) {
        //this.value = value;
        //this.filter = filter;
        console.log('updating user...')
        try {
            let res = await axios.patch(`http://localhost:8000/users/${key}`, value);
            console.log(res)
            return res.data;
        } catch (err) {
            console.error(err)
        }
        return null;
    }


    async create (value) {
        //this.value = value;
        //this.filter = filter;
        console.log('adding user...')
        try {
            let res = await axios.post('http://localhost:8000/users', value);
            console.log(res)
            return res.data;
        } catch (err) {
            console.error(err)
        }
        return null;
    }
}
