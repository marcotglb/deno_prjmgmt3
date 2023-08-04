
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
          <label for="username">Username</label>
          <InputText
            id="username"
            type="username"
            v-model="username"
            :disabled="!editing"
          />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="firstname">First Name</label>
          <InputText
            id="firstname"
            type="username"
            v-model="firstname"
            :disabled="!editing"
          />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="lasttname">Last Name</label>
          <InputText
            id="lastname"
            type="username"
            v-model="lastname"
            :disabled="!editing"
          />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="password">Password</label>
          <InputText
            id="password"
            type="password"
            v-model="password"
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
    console.log("props: ", props);
    const store = useStore();
    //console.log("setup(). store=", store);

    let savedEl = {};
   
    const formObj = {
      id: ref(null),
      org_id: ref(null),
      username: ref(null),
      firstname: ref(null),
      lastname: ref(null),
      password: ref(null)
    };

    const whoList = ref();
    whoList.value = [{ name: "Marco" }, { name: "Andreas" }];
    whoList.value = ["Marco", "Andreas"];
    copySelected(store.state.user.selected, formObj);

    const editing = ref(false);
    const isnew = ref(false);

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
    onMounted(() => {});

    function copySelected(v, formObj) {
      for (let f in formObj) {
        if (formObj[f]) formObj[f].value = v[f];
      }
    }

    function saveCurrent(v, formObj) {
      for (let f in formObj) {
        if (formObj[f]) v[f] = formObj[f].value;
      }
    }

    function onEdit() {
      editing.value = true;
      saveCurrent(savedEl, formObj);
      isnew.value = false;
    }

    async function onSave() {
      let newVal = {};
      for (let f in formObj) newVal[f] = formObj[f].value;
      if (isnew.value) {
        console.log('props', props)
        newVal.father = props.top;
        context.emit("create", newVal);
      } else {
        context.emit("update", {
          value: newVal,
          filter: { id: formObj.id.value },
        });
      }
      editing.value = false;
    }

    function onNew() {
      saveCurrent(savedEl, formObj);
      for (let f in formObj) formObj[f].value = null;
      editing.value = true;
      isnew.value = true;
    }

    function onCancel() {
      copySelected(savedEl, formObj);
      editing.value = false;
    }

    function onDelete() {
      if (formObj.id.value > 0) {
        context.emit("delete", { id: formObj.id.value });
        for (let f in formObj) formObj[f].value = null;
        editing.value = false;
        isnew.value = false;
      }
    }

    return {
      onEdit,
      onSave,
      onCancel,
      onNew,
      onDelete,
      /*id, title, who, what,*/ ...formObj,
      // onSubmit,
      editing,
    };
  },
  methods: {
    ...mapActions("user", ["patchElement"]),
  },
};
</script>
