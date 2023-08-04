<template>
  <Splitter layout="horizontal" class="splitter">
    <SplitterPanel class="splittedPanel">
      <DeliverableTable
        :elements="elements"
        @selectedElement="onSelected"
        @goUp="goUp"
        @goDown="goDown"
      />
    </SplitterPanel>
    <SplitterPanel class="splittedPanel">
      <DeliverableForm :selected="selected" :top="top" @create="onCreate" @update="onUpdate" @delete="onDelete"/> 
    </SplitterPanel>
  </Splitter>
</template>

<script>
import {  ref,  /* inject, toRefs, watch*/ } from "vue";
import actions from "./Deliverables.js";

//import Splitter from "primevue/splitter";
//import SplitterPanel from "primevue/splitterpanel";
import DeliverableForm from "@/components/deliverables/DeliverableForm.vue";
import DeliverableTable from "@/components/deliverables/DeliverableTable.vue";

//import Store from './store.js'
//import Store from '@/store/Store';

export default {
  components: {
    //Splitter: Splitter,
    //SplitterPanel: SplitterPanel,
    DeliverableForm: DeliverableForm,
    //Store: Store
    DeliverableTable: DeliverableTable,
  },

  setup() {
    //let elValue = null;
    //if (!this.titolo) this.titolo = "inizio";
    //if (!this.deliverable) this.deliverable = new Deliverable();



    let elements = ref([])
    let selected = ref({})
    let top = ref(0)

    let state = {
      elements,
      selected,
      navStack: [0],
    };

    function onSelected(event) {
      console.log("Deliverables.onSelected. selected element is:", event.data);
      selected.value =  elements.value.find(el => el.id == event.data.id);
      console.log ('selected.value: ', selected.value);
    }

    function goUp(event) {
      console.log("Deliverables.goUp. data:", event);
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
      console.log("Deliverables.goDown data:", event, id);
      
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
      /*
      if (data)
        actions.select(state);
      */
    }
    
    function onCreate(event) {
      actions.create(state, event);
      /*
      if (data) {
        console.log ('inserted: ', data)
        actions.select(state);
        selected.value = elements.value.find(el => el.id = data.id)
      }
      */
    }

    function onDelete(event) {
      actions.del(state, event);
    }

    actions.select(state);
 
    
    return {
      elements,
      selected,
      onSelected,
      goUp, goDown,
      onUpdate, onCreate, onDelete, top
         /* SplitterPanel*/
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