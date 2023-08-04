<template>
  <div>
    {{ username }}
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "vuex";

export default {
  name: "avatar",
  components: {},

  setup() {
    const store = useStore();
    return {
      username: computed(() => `${store.state.credential.username} (${store.state.credential.firstname} ${store.state.credential.lastname})`),
    };
  },
  methods: {},
};
</script>



<style>
</style>