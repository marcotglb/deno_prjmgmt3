import http from '../../lib/http';
const apiBaseUrl = '/deliverables'


/*
getters = {
    elements: this.state.elements,
    selected: this.state.selected,
    navStack: this.state.namStack,
    filters: this.state.filters
};
*/


// Mutations
/*
setElements(elements) {
    this.state.elements = elements
}

setSelected(selected) {
    this.state.selected = selected
}
popTop() {
    if (this.state.navStack.length > 1) {
        this.state.navStack.pop()
        return true;
    }
    return false;
}
pushTop(state, newroot) {
    state.navStack.push(newroot)
}
patchElements(state, updated) {
    console.log('patchElements. updated=', updated)
    for (let u of updated) {
        let idx = state.elements.findIndex(el => (el.id == u.id));
        console.log('idx=', idx)
        state.elements[idx] = u;
    }
}
addElements(state, updated) {
    console.log('addElements. updated=', updated)
    for (let u of updated) {
        state.elements.push(u);
    }
}

cutElements(state, filter) {
    console.log('deletedElements. filter=', filter)
    let undeleted = [];
    for (let e of state.elements) {
        let found = true;
        for (let f in filter) {
            if (e[f] != filter[f])
                found = false;
        }
        if (!found)
            undeleted.push(e);
    }
    state.elements = undeleted;
}
initFilters(state, filter) {
    state.filters = filter;
}
*/


async function select(state, filter) {
    console.log('Deliverable.get(filter). navStack=', state.navStack)

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
        //commit('patchElements', res.data);
        //commit('setSelected', value);
        select(state);
        return res.data;
    } catch (err) {
        console.error(err)
    }
}
async function del(state, filter) {
    console.log('deleting deliverables...')
    try {
        let res = await http.delete(apiBaseUrl, { data: filter })
        console.log(res);
        //this.commit('cutElements', filter);
        //this.commit('setSelected', {});
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
        //this.commit('setSelected', res.data);
        //this.commit('addElements', [res.data]);
        select(state);
        state.selected.value = res.data;
        //state.selected.value = state.elements.value.find(el => el.id = res.data.id)
        return res.data;
    } catch(err) {
        console.error(err);
    }
}


export default { select, update, del, create };