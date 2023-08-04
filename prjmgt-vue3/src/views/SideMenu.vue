<template>
  <!-- <div class="footer-container p-p-2 p-ai-end p-jc-end"> -->
  <Button
    type="button"
    label="Menu"
    icon="pi pi-fw pi-bars"
    class="p-d-flex p-ai-end p-jc-end"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_tmenu"
  />
  <TieredMenu id="overlay_tmenu" ref="menu" :model="items" :popup="true" />
  <!-- </div>  -->
</template>

<script>
export default {
  setup(props, context) {
    return {
      items: [
        {
          label: "File",
          icon: "pi pi-fw pi-file",
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark",
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video",
                },
              ],
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-trash",
            },
            {
              separator: true,
            },
            {
              label: "Export",
              icon: "pi pi-fw pi-external-link",
            },
          ],
        },
        {
          label: "Users",
          icon: "pi pi-fw pi-pencil",
          command: (event) => {
            context.emit("menu", event);
          },
          items: [
            {
              label: "Left",
              icon: "pi pi-fw pi-align-left",
            },
            {
              label: "Right",
              icon: "pi pi-fw pi-align-right",
            },
            {
              label: "Center",
              icon: "pi pi-fw pi-align-center",
            },
            {
              label: "Justify",
              icon: "pi pi-fw pi-align-justify",
            },
          ],
        },
        {
          label: "Deliverables",
          icon: "pi pi-fw pi-user",
          to: "/Deliverables",
          command: (event) => {
            context.emit("menu", event);
          },
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-user-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-user-minus",
            },
            {
              label: "Search",
              icon: "pi pi-fw pi-users",
              items: [
                {
                  label: "Filter",
                  icon: "pi pi-fw pi-filter",
                  items: [
                    {
                      label: "Print",
                      icon: "pi pi-fw pi-print",
                    },
                  ],
                },
                {
                  icon: "pi pi-fw pi-bars",
                  label: "List",
                },
              ],
            },
          ],
        },
        {
          label: "Security",
          icon: "pi pi-fw pi-calendar",
          items: [
            {
              label: "Users",
              icon: "pi pi-fw pi-user",
              to: "/Users/0",
            },
            {
              label: "Archieve",
              icon: "pi pi-fw pi-calendar-times",
              items: [
                {
                  label: "Remove",
                  icon: "pi pi-fw pi-calendar-minus",
                },
              ],
            },
          ],
        },
        {
          label: "Login",
          icon: "pi pi-fw pi-pencil",
          command: (event) => {
            context.emit("menu", event);
          },
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
        },
      ],
    };
  },

  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
};
</script>


<style scoped>
.footer-container {
  border: 1px solid var(--surface-d);
  background-color: whitesmoke;
}
</style>