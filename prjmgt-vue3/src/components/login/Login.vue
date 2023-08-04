<template>
  <LoginForm @login="onLogin" @Cancel="onCancel" />
</template>

<script>
import { ref } from "vue";
import actions from "./Logins.js";
import LoginForm from "@/components/login/LoginForm.vue";
import { useStore } from "vuex";

export default {
  props: {
    index: Number
  },
  components: {
    LoginForm: LoginForm,
  },

  setup(props, context) {
    let elements = ref([]);
    let selected = ref({});
    let top = ref(0);

    let state = {
      elements,
      selected,
      navStack: [0],
    };
    const store = useStore();

    async function onLogin(event) {
      let answer = await actions.login(state, event);
      console.log ("onLogin(). answer:", answer)
      if (answer && answer.jwt) {
        console.log("got jwt. Index in Tabs is ", props.index);
        store.dispatch("credential/setCredentials", answer);
        context.emit("close", props.index)
      }
    }

    function onCancel(event) {
      console.log(event);
      context.emit("close", props.index)
      // to be defined
    }

    return {
      elements,
      selected,
      onLogin,
      onCancel,
      top,
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