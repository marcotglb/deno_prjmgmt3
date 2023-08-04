<template>
  <div>
    <EditMenu
      :editing="editing"
      @menu-edit="onEdit"
      @menu-save="onSave"
      @menu-cancel="onCancel"
      @menu-delete="onDelete"
      @menu-new="onNew"
    />
    <div class="p-grid formBox">
      <div class="p-col">
        <div class="p-field p-col-12 p-md-4">
           <span> Top is: {{top}} </span>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="id">Id</label>
          <InputText id="title" v-model="id" :disabled="true" />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="title">Title</label>
          <InputText
            id="title"
            type="title"
            v-model="title"
            :disabled="!editing"
          />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="who">Who</label>
          <AutoComplete
            v-model="who"
            :suggestions="filteredWho"
            @complete="searchWho($event)"
            :dropdown="true"
            forceSelection
            :disabled="!editing"
          >
          </AutoComplete>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="effort">effort</label>
          <InputText id="effort" v-model="effort" :disabled="!editing" />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="completed">completed</label>
          <InputText id="completed" v-model="completed" :disabled="!editing" />
        </div>
      </div>
      <div class="p-col">
        <div class="p-field p-col-12 p-md-4">
          {{ delivered }}
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="delivered">when</label>
          <InputMask
            mask="9999/99/99"
            v-model="delivered"
            :disabled="!editing"
          />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="what">What</label>
          <Textarea
            id="what"
            v-model="what"
            rows="5"
            cols="30"
            :disabled="!editing"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, /*inject, toRefs,*/ watch } from "vue";
import { useStore, mapActions } from "vuex";

export default {
  props: {
    selected: Object,
    top: Number
  },

  setup(props, context) {
    //const eventBus = inject("eventBus");
    console.log("props: ", props);
    const store = useStore();
    //console.log("setup(). store=", store);

    let savedEl = {};
   
    //const father = ref(0);
    const formObj = {
      id: ref(null),
      title: ref(null),
      who: ref(null),
      delivered: ref(null),
      what: ref(null),
      effort: ref(null),
      completed: ref(null),
    };

    const whoList = ref();
    whoList.value = [{ name: "Marco" }, { name: "Andreas" }];
    whoList.value = ["Marco", "Andreas"];
    const filteredWho = ref();
    const selectedWho = ref([]);
    //var formObj = {};
    copySelected(store.state.deliverable.selected, formObj);

    const searchWho = (event) => {
      setTimeout(() => {
        if (!event.query.trim().length) {
          filteredWho.value = [...whoList.value];
        } else {
          filteredWho.value = whoList.value.filter((who) => {
            return who.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    };

    const editing = ref(false);
    const isnew = ref(false);

    //let deliverable = new Deliverable();

    //const { elValue } = toRefs(props);

    watch(
      () => props.selected,
      (newVal, oldVal) => {
        console.log(
          "Watch props.selected function called with args:",
          newVal,
          oldVal
        );
        if (!editing.value) {
          copySelected(newVal, formObj);
          //father.value = newVal.father;
        }
      }
    );

    /*
    store.watch(
      (state) => state.deliverable.selected,
      () => {
        editing.value = false;
        //console.log("store changed.", store.state.deliverable.selected);
        copySelected(store.state.deliverable.selected, formObj);
      }
    );
    */

    onMounted(() => {});

    function copySelected(v, formObj) {
      for (let f in formObj) {
        if (formObj[f]) formObj[f].value = v[f];
      }
      selectedWho.value[0] = v.who;
    }

    function saveCurrent(v, formObj) {
      for (let f in formObj) {
        if (formObj[f]) v[f] = formObj[f].value;
      }
      v.who = selectedWho.value[0];
    }

    function onEdit() {
      editing.value = true;
      saveCurrent(savedEl, formObj);
      isnew.value = false;
    }

    /*
    eventBus.on("Edit", () => {
      editing.value = true;
      isnew.value = false;
    });
    */

    async function onSave() {
      //eventBus.on("Save", async () => {

      //let deliverable = new Deliverable();
      //console.log(deliverable.value);
      let newVal = {};
      for (let f in formObj) newVal[f] = formObj[f].value;
      //newVal.who = selectedWho.value.name;
      if (isnew.value) {
        //store.dispatch("deliverable/createElement", newVal);
        console.log('props', props)
        newVal.father = props.top;
        context.emit("create", newVal);
      } else {
        //await deliverable.upd(newVal, { id: id.value });

        //store.dispatch("deliverable/patchElement", {
        context.emit("update", {
          value: newVal,
          filter: { id: formObj.id.value },
        });
      }
      editing.value = false;
    }

    function onNew() {
      //eventBus.on("New", async () => {
      //let deliverable = new Deliverable();
      //console.log(deliverable.value);
      saveCurrent(savedEl, formObj);
      for (let f in formObj) formObj[f].value = null;
      editing.value = true;
      isnew.value = true;
    }

    function onCancel() {
      //eventBus.on("Cancel", async () => {
      //copySelected(store.state.deliverable.selected, formObj);
      copySelected(savedEl, formObj);
      /*
      for (let f in elValue.value) {
        if (formObj[f]) formObj[f].value = elValue.value[f];
      }
      */
      editing.value = false;
    }

    function onDelete() {
      if (formObj.id.value > 0) {
        context.emit("delete", { id: formObj.id.value });
        //store.dispatch("deliverable/deleteElements", { id: formObj.id.value });
        for (let f in formObj) formObj[f].value = null;
        editing.value = false;
        isnew.value = false;
      }
    }

    /*
    const onSubmit = async () => {
      //let deliverable = new Deliverable();
      console.log('onSubmit called. deliverable.value=', deliverable.value);
      store.dispatch('deliverable.patchElement', {value: { title: title.value, who: who.value, what: what.value }, filter:{ id: id.value }})
    };
    */
    //title.value = deliverable.title;
    //what.value = deliverable.what;

    //return (id, who, title, what, onSubmit)
    return {
      onEdit,
      onSave,
      onCancel,
      onNew,
      onDelete,
      /*id, title, who, what,*/ ...formObj,
      // onSubmit,
      editing,
      searchWho,
      selectedWho,
      filteredWho,
      //patchElement: () => store.dispatch('deliverable.patchElement')
    };
  },
  methods: {
    ...mapActions("deliverable", ["patchElement"]),
  },
};
</script>

<style scoped>
.formBox {
  max-width: fit-content;
  background-color:beige;
}
</style>