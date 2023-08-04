<template>
  <Splitter layout="horizontal" class="splitter">
    <SplitterPanel class="splittedPanel">
      <UserTable
        :elements="elements"
        @selectedElement="onSelected"
        @goUp="goUp"
        @goDown="goDown"
      />
    </SplitterPanel>
    <SplitterPanel class="splittedPanel">
      <UserForm :selected="selected" :top="top" @create="onCreate" @update="onUpdate" @delete="onDeleteOne"/> 
    </SplitterPanel>
  </Splitter>
</template>

<script>
import {  ref, } from "vue";
import actions from "./Users.js";
import UserForm from "@/components/users/UserForm.vue";
import UserTable from "@/components/users/UserTable.vue";

export default {
  components: {
    UserForm: UserForm,
    UserTable: UserTable,
  },

  setup() {
    let elements = ref([])
    let selected = ref({})
    let top = ref(0)

    let state = {
      elements,
      selected,
      navStack: [0],
    };

    function onSelected(event) {
      console.log("Users.onSelected. selected element is:", event.data);
      selected.value =  elements.value.find(el => el.id == event.data.id);
      console.log ('selected.value: ', selected.value);
    }

    function goUp(event) {
      console.log("Users.goUp. data:", event);
      if (state.navStack.length > 1) {
        state.navStack.pop();
        top.value = state.navStack[state.navStack.length-1];
        actions.select(state);
        selected.value = {};
        return true;
      }
      return false;
    }

    function goDown(event, id) {
      console.log("Users.goDown data:", event, id);
      
      if (state[state.navStack.length-1] != id) {
        state.navStack.push(id);
        top.value = id;
        actions.select(state);
        selected.value = {};
        return true;
      }
      //actions.select(state);
      return false;
      
    }


    function onUpdate(event) {
      actions.update(state, event);
    }
    
    function onCreate(event) {
      actions.create(state, event);
    }


    function onDelete(event) {
      actions.del(state, event);
    }

    function onDeleteOne(event) {
      actions.delOne(state, event.id);
    }

    actions.select(state);
 
    
    return {
      elements,
      selected,
      onSelected,
      goUp, goDown,
      onUpdate, onCreate, onDelete, onDeleteOne, top
    };
  },
};
</script>

<style>
.splitter {
  height: 88vh;
}
.splittedPanel {
  height: flex;
  background-color: royalblue;
  margin: 0.4%;
}
</style>