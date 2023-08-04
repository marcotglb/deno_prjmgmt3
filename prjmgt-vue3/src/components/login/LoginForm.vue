
<template>
  <div>
    <LoginMenu
      :editing="editing"
      @menu-login="onLogin"
      @menu-cancel="onCancel"
    />
    <div class="p-grid formBox">
      <div class="p-col">
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
import { ref, onMounted, /*inject, toRefs, watch*/ } from "vue";
//import { useStore, mapActions } from "vuex";

export default {
  props: {
  },

  setup(props, context) {
    console.log("props: ", props);
    //console.log("setup(). store=", store);

    //let savedEl = {};
   
    const formObj = {
      username: ref(null),
      password: ref(null)
    };

    //const whoList = ref();
    //whoList.value = [{ name: "Marco" }, { name: "Andreas" }];
    //whoList.value = ["Marco", "Andreas"];

    
    const editing = ref(true);
    const isnew = ref(true);

    onMounted(() => {});


    /*
    function onEdit() {
      editing.value = true;
      //saveCurrent(savedEl, formObj);
      isnew.value = false;
    }
    */

    async function onLogin() {
      let newVal = {};
      for (let f in formObj) newVal[f] = formObj[f].value;
      if (isnew.value) {
        console.log('props', props)
        //newVal.father = props.top;
        context.emit("login", newVal);
      } 
      //editing.value = false;
    }

    /*
    function onNew() {
      //saveCurrent(savedEl, formObj);
      for (let f in formObj) formObj[f].value = null;
      editing.value = true;
      isnew.value = true;
    }
    */

    function onCancel() {
      //copySelected(savedEl, formObj);
      context.emit("cancel");
    }

    /*
    function onDelete() {
      if (formObj.id.value > 0) {
        context.emit("delete", { id: formObj.id.value });
        for (let f in formObj) formObj[f].value = null;
        editing.value = false;
        isnew.value = false;
      }
    }
    */

    return {
      //onEdit,
      onLogin,
      onCancel,
      //onNew,
      //onDelete,
      /*id, title, who, what,*/ ...formObj,
      // onSubmit,
      editing
    };
  },
  /*
  methods: {
    ...mapActions("user", ["patchElement"]),
  },
  */
};
</script>

<style scoped>
.formBox {
  max-width: fit-content;
  background-color:beige;
}
</style>