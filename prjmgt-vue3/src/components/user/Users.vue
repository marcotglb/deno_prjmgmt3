<template>
  <Splitter style="height: 600px" layout="horizontal">
    <SplitterPanel class="splittedPanel">
      <UserTable :top="top" @el-selected="elSelected" />
    </SplitterPanel>
    <SplitterPanel class="splittedPanel">
      <UserForm :elValue="elValue" :top="top" />
    </SplitterPanel>
  </Splitter>
</template>

<script>
export default {
  props: {
    top: { type: String, default: "0" },
  },
  data() {
    console.log("User.data. top=", this.top);
    let elValue = null;
    return { elValue: elValue };
  },
  created() {
    console.log("User.created");
  },
  methods: {
    elSelected(event) {
      console.log("elSelected. event:", event);
      this.elValue = event;
    },
  },
};
</script>

<style>
.splittedPanel {
  width: 20%;
  background-color: cornsilk;
}
</style>