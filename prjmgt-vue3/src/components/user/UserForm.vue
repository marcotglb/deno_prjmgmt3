<template>
  <div>
    <EditMenu :editing="editing" />
    <div class="p-grid">
      <div class="p-col">
        <div class="p-field p-col-12 p-md-4">
          {{ id }}
          <label for="title">Username</label>
          <InputText
            id="username"
            type="username"
            v-model="username"
            :disabled="!editing"
          />
        </div>
        
        <div class="p-field p-col-12 p-md-4">
          <label for="firstname">Firstname</label>
          <InputText
            id="delivered"
            type="firstname"
            v-model="firstname"
            :disabled="!editing"
          />
        </div>
      </div>
      <div class="p-col">
        <div class="p-field p-col-12 p-md-4">
          <label for="email">email</label>
          <InputText
            id="email"
            type="lastname"
            v-model="email"
            :disabled="!editing"
          />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <label for="lastname">lastname</label>
          <InputText
            id="lastname"
            type="lastname"
            v-model="lastname"
            :disabled="!editing"
          />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject, watch, toRefs } from "vue";
import User from "../../../services/User";

//import mitt from 'mitt'
//const emitter = mitt();

export default {
  //props: { user: User, titolo: String },
  //inject: ["eventBus"],
  props: {
    elValue: {
      type: Object,
      required: true,
    },
    top: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const eventBus = inject("eventBus");

    const id = ref("id");
    const firstname = ref("firtname");
    const lastname = ref("lastname");
    const username = ref("username");
    const email = ref("email");

    const formObj = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
    };

    const whoList = ref();
    //whoList.value = [{name: 'Marco'}, {name: 'Andreas'}]
    whoList.value = ["Marco", "Andreas"];
    const filteredWho = ref();
    const selectedWho = ref([]);

    /*
    const searchWho = (event) => {
      setTimeout(() => {
        if (!event.query.trim().length) {
          filteredWho.value = [...whoList.value];
        } else {
          filteredWho.value = whoList.value.filter((who) => {
            return who.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    };
    */
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

    let user = new User();
    const { elValue } = toRefs(props);

    watch(elValue, (v) => {
      editing.value = false;
      for (let f in v) {
        if (formObj[f]) formObj[f].value = v[f];
      }
      selectedWho.value[0] = elValue.value.who;
    });

    onMounted(() => {
      /*
      eventBus.on("deiverableSelected", (userValue) => {
        console.log(userValue);
        user.value = userValue;
        editing.value = false;
        id.value = userValue.id;
        title.value = userValue.title;
        who.value = userValue.who;
        what.value = userValue.what;
      });
      */
    });

    eventBus.on("Edit", () => {
      editing.value = true;
      isnew.value = false;
    });
    eventBus.on("Save", async () => {
      //let user = new User();
      console.log(user.value);
      let newVal = {};
      for (let f in formObj) newVal[f] = formObj[f].value;
      //newVal.who = selectedWho.value.name;
      if (isnew.value) {
        newVal.father = props.top;
        let created = await user.create(newVal);
        if (created) formObj.id.value = created.id;
      } else {
        await user.upd(newVal, { id: id.value });
      }
      editing.value = false;
    });
    eventBus.on("New", async () => {
      //let user = new User();
      console.log(user.value);
      for (let f in formObj) formObj[f].value = "";
      editing.value = true;
      isnew.value = true;
    });
    eventBus.on("Cancel", async () => {
      for (let f in elValue.value) {
        if (formObj[f]) formObj[f].value = elValue.value[f];
      }
      editing.value = false;
    });

    
    return {
      /*id, title, who, what,*/ ...formObj,
      editing,
      searchWho,
      selectedWho,
      filteredWho,
    };
  },
  /*
  data() {
    console.log("UserForm.data");
    console.log(this.user);
    if (!this.user) this.user = new User();
    return this.user;
  },
  */

  created() {
    console.log("UserForm.created");
    // this.user = (new User()).value;
  },

  /*
  mounted() {
    this.eventBus.on("deiverableSelected", (selected) => {
      console.log(selected);
      this.user = selected;
    });
  },
*/

  /*
  methods: {
    onSubmit() {
      console.log();
    },
  },
  */
};
</script>
