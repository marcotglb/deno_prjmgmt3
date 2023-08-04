<template>
  <table class="apptable" style="width: 100%">
    <tr>
      <td  style="vertical-align: top;">
      <router-view />
      </td>
    </tr>
    <tr>
      <td  style="vertical-align: bottom;">
      <SideMenu />
      </td>
    </tr>
  </table>
</template>

<script>
import mitt from "mitt";
const eventBus = mitt();

export default {
  provide() {
    return {
      eventBus: eventBus,
    };
  },
};
</script>



<style>
html body {
  height: 100%;
  width: 100%;
  margin: 0vh;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: burlywood;
  margin: 0vh;

}
.app-container {
  text-align: left;
  min-height: 100vh;
   margin: 0vh;
}
.apptable {
  text-align: left;
  margin: 0vh;
}

DataTable {
  text-align: left;
}
Column {
  text-align: left;
}
</style>