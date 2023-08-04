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
    <div class="p-grid">
      <div class="p-col">
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
import { ref, onMounted /*inject, toRefs, watch*/ } from "vue";
//import Deliverable from "../../../services/Deliverable.js.off";
import { useStore, mapActions } from "vuex";

//import mitt from 'mitt'
//const emitter = mitt();

export default {
  //props: { deliverable: Deliverable, titolo: String },
  //inject: ["eventBus"],
  props: {
    /*
    elValue: {
      type: Object,
      required: true,
    },
    */
    top: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    //const eventBus = inject("eventBus");
    const store = useStore();
    console.log('setup(). store=', store)

    /*
    const id = ref("id");
    const title = ref("title");
    const who = ref("who");
    const delivered = ref("delivered");
    const what = ref("what");
    */
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

    store.watch(
      (state) => state.deliverable.selected,
      () => {
        editing.value = false;
        //console.log("store changed.", store.state.deliverable.selected);
        copySelected(store.state.deliverable.selected, formObj);
      }
    );

    onMounted(() => {});

    function copySelected(v, formObj) {
      for (let f in formObj) {
        if (formObj[f]) formObj[f].value = v[f];
      }
      selectedWho.value[0] = v.who;
    }

    function onEdit() {
      editing.value = true;
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
        newVal.father = props.top;
        store.dispatch("deliverable/createElement", newVal);
        //let created = await deliverable.create(newVal);
        // if (created) formObj.id.value = created.id;
      } else {
        //await deliverable.upd(newVal, { id: id.value });
        store.dispatch("deliverable/patchElement", {
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
      for (let f in formObj) formObj[f].value = "";
      editing.value = true;
      isnew.value = true;
    }
    function onDelete() {
      if (formObj.id.value > 0) {
        store.dispatch("deliverable/deleteElements", { id: formObj.id.value });
        editing.value = false;
        isnew.value = false;
      }
    }
    function onCancel() {
      //eventBus.on("Cancel", async () => {
      copySelected(store.state.deliverable.selected, formObj);
      /*
      for (let f in elValue.value) {
        if (formObj[f]) formObj[f].value = elValue.value[f];
      }
      */
      editing.value = false;
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
  /*
  data() {
    console.log("DeliverableForm.data");
    console.log(this.deliverable);
    if (!this.deliverable) this.deliverable = new Deliverable();
    return this.deliverable;
  },
  */

  created() {
    console.log("DeliverableForm.created");
    // this.deliverable = (new Deliverable()).value;
  },

  /*
  mounted() {
    this.eventBus.on("deiverableSelected", (selected) => {
      console.log(selected);
      this.deliverable = selected;
    });
  },
*/

  methods: {
    ...mapActions("deliverable", ["patchElement"]),

    /*
    onSubmit() {
      console.log();
    },
    */
  },
};
</script>
