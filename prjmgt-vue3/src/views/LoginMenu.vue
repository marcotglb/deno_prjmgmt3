<template>
  <Menubar :model="items"> </Menubar>
</template>

<script>
import { ref, /*watch, inject*/ } from "vue";
export default {
  props: {
    editing: Boolean,
  },
  setup(props, context) {

    const items = ref([

      {
        label: "Login",
        command: (event) => { context.emit('menu-login', event) }, // {eventBus.emit('Save', event)},
        icon: "pi-sign-in",
        visible: () => { return props.editing }
      },

      {
        label: "Cancel",
        command: (event) => { context.emit('menu-cancel', event) }, //{eventBus.emit('Cancel', event)},
        icon: "pi pi-fw",
        visible: () => { return props.editing }
      },
    ]);
    return { items };


    /*
    onRowSelect(event) {
      // console.log(event.data);
      // this.$emit('obj-selected', {...event.data})
      this.eventBus.emit('deiverableSelected', {...event.data});
    },
*/
  },
};
</script>


<style scoped></style>