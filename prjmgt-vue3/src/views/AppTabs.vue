<template>
  <div class="wrapper">
    <div class="p-d-flex" style="background-color: beige">
      <div class="p-mr-2">
        <!--<div class="footerBox"> -->
        <SideMenu @menu="menuHandler" />
        <!-- </div> -->
      </div>
      <div class="p-mr-2 logBox" style="width: 85%">Item 2</div>
      <div class="logBox"><Avatar /></div>
    </div>

    <div class="appBox">
      <div class="p-tabview p-component">
        <ul ref="nav" class="p-tabview-nav" role="tablist">
          <li
            role="presentation"
            v-for="(tab, i) of tabs"
            :key="tab.index"
            :class="[{ 'p-highlight': active === i }]"
          >
            <a
              role="tab"
              class="p-tabview-nav-link"
              :aria-selected="active === i"
            >
              <span class="p-tabview-title" @click="active = i">
                {{ tab.title }}</span
              >
              <Button
                icon="pi pi-times"
                @Click="onTabClose(i)"
                class="
                  p-button-rounded p-button-danger p-button-text p-button-sm
                "
              />
            </a>
          </li>
          <li ref="inkbar" class="p-tabview-ink-bar"></li>
        </ul>
        <div v-for="(tab, index) of tabs" :key="tab.index">
          <component
            v-bind:is="tab.content"
            v-show="index == active"
            :index="index"
            @close="onTabClose(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import mitt from "mitt";
//const eventBus = mitt();
import { ref /*inject, toRefs, watch*/ } from "vue";
import Deliverables from "@/components/deliverables/Deliverables.vue";
import Users from "@/components/users/Users.vue";
import Login from "@/components/login/Login.vue";
import Avatar from "@/views/Avatar.vue";

//import TabView from "@/components/general/TabView.vue";
//import { useStore } from "vuex";

export default {
  name: "app",
  components: {
    //TabView,
    Deliverables,
    Users,
    Login,
    Avatar,
  },

  setup() {
    //const store = useStore();
    //console.log("AppTabs.setup(). store=", store);
    const active = ref(0);
    const tabs = ref([
      //{ title: "Deliverables", content: "Deliverables" },
      //{ title: "Title 3", content: "Content 2" },
      //{ title: "Title 3", content: "Content 3" },
    ]);

    function onTabClose(index) {
      console.log(
        "index=",
        index,
        "  active=",
        active.value,
        "  tabs.length-1=",
        tabs.value.length - 1
      );

      if (active.value >= tabs.value.length - 1)
        if (active.value > 0) active.value--;

      console.log("before splice: tabs.value=", tabs.value);
      tabs.value.splice(index, 1);
      console.log("after  splice: tabs.value=", tabs.value);
      console.log("index=", index, "  active=", active.value);
    }

    function menuHandler(event) {
      console.log("AppTabs.menuHandler(). event.item.label=", event.item.label);
      let index = Math.floor(Date.now() / 1000); // tabs.value.length;
      switch (event.item.label) {
        case "Deliverables":
          tabs.value.push({
            index: index,
            title: "Deliverables",
            content: "Deliverables",
          });
          active.value = tabs.value.length - 1;
          break;
        case "Users":
          tabs.value.push({ index: index, title: "Users", content: "Users" });
          active.value = tabs.value.length - 1;
          break;
        case "Login":
          tabs.value.push({ index: index, title: "Login", content: "Login" });
          active.value = tabs.value.length - 1;
          break;
      }
    }

    return {
      tabs,
      active,
      menuHandler,
      onTabClose,
    };
  },
  methods: {},
};
</script>



<style>
html body {
  /*height: 100%;*/
  width: 100%;
  min-height: 100%;
  margin: 0vh;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: burlywood;
  height: 100vh;
  margin: 0vh;
}
.app-container {
  text-align: left;
  /*min-height: 100vh*/
  /*max-height: 100vh;*/
  margin: 0vh;
}
.apptable {
  text-align: left;
  margin: 0vh;
  min-width: 100%;
}
.wrapper {
  vertical-align: middle;
}
.appBox {
}
.footerBox {
  background-color: bisque;
  align-items: flex-end;
}

DataTable {
  text-align: left;
}
Column {
  text-align: left;
}
</style>
<style lang="scss" scoped>
.tabview-custom {
  i,
  span {
    vertical-align: middle;
  }
  span {
    margin: 0 0.5rem;
  }
}
.p-tabview p {
  line-height: 0.5;
  margin: 0;
  padding: 0;
  //padding: 0.2rem;
}

.p-tabview-nav {
  display: flex;
  height: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  flex-wrap: wrap;
}
.p-tabview-nav-link {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  padding: 0.2rem;
}
.p-tabview-ink-bar {
  display: none;
  z-index: 1;
}
.p-tabview-nav-link:focus {
  z-index: 1;
}
.p-tabview-title {
  line-height: 1;
}
.logBox {
  background-color: beige;
}
</style>