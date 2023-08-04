import http from '../../lib/http';
const apiBaseUrl = '/users'


async function select(state, filter) {
    console.log('User.get(filter). navStack=', state.navStack)

    filter = { top: state.navStack[state.navStack.length - 1] }
    try {
        let res = await http.get(apiBaseUrl, { params: filter });
        console.log(res)
        state.elements.value = res.data;
        return res.data;
    } catch (err) {
        console.error(err)
    }
}
async function update(state, { value, filter }) {
    console.log('updating deliverable...')

    try {
        let res = await http.patch(apiBaseUrl, { value: value, filter: filter })
        //console.log(res.data);
        select(state);
        return res.data;
    } catch (err) {
        console.error(err)
    }
}

async function del(state, filter) {
    console.log('deleting users...')
    try {
        let res = await http.delete(apiBaseUrl, { data: filter })
        console.log(res);
        select(state);
        return res.data;
    } catch(err) {
        console.error(err)
    }
}


async function delOne(state, id) {
    console.log('deleting users...')
    try {
        let res = await http.delete(apiBaseUrl + '/' + id)
        console.log(res);
        select(state);
        return res.data;
    } catch(err) {
        console.error(err)
    }
}


async function create(state, value) {
    console.log('creating deliverable...', value)
    try {
        let res = await http.post(apiBaseUrl, value)
        //console.log(res);
        select(state);
        state.selected.value = res.data;
        return res.data;
    } catch(err) {
        console.error(err);
    }
}


export default { select, update, del, delOne, create };