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
    //const eventBus = inject("eventBus");

    /*
    watch(() => {
      console.log(`editing is: ` + props.editing);
    });
    */

    /*
    onMounted(() => {
      onEdit("deiverableSelected", (deliverable) => {
        console.log(deliverable);        
      });
    });
    */

    const items = ref([
      {
        label: "New",
        command:(event) => {context.emit('menu-new', event)}, //{eventBus.emit('New', event)},
        icon: "pi pi-fw pi-user-edit",
        visible: () => {return !props.editing}
      },
      {
        label: "Edit",
        command:(event) => {context.emit('menu-edit', event)/*eventBus.emit('Edit', event)*/},
        icon: "pi pi-fw pi-user-edit",
        //disabled: () => {return props.editing},
        visible: () => {return !props.editing}
      },
      {
        label: "Save",
        command:(event) => {context.emit('menu-save', event)}, // {eventBus.emit('Save', event)},
        icon: "pi pi-fw pi-save",
        visible: () => {return props.editing}
      },
            {
        label: "Delete",
        command:(event) => {context.emit('menu-delete', event)}, // {eventBus.emit('Save', event)},
        icon: "pi pi-fw pi-trash",
        visible: () => {return !props.editing}
      },
      {
        label: "Cancel",
        command:(event) => {context.emit('menu-cancel', event)}, //{eventBus.emit('Cancel', event)},
        icon: "pi pi-fw",
        visible: () => {return props.editing}
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


<style scoped>
</style>