<template>
  <Splitter layout="horizontal" style="width: 100%">
    <SplitterPanel class="splittedPanel">
      <DeliverableTable  />
    </SplitterPanel>
    <SplitterPanel class="splittedPanel" >
      <DeliverableForm/>
    </SplitterPanel>
  </Splitter>
</template>

<script>
// import Deliverable from "../../services/Deliverable";

export default {

  data() {
    //let elValue = null;
    //if (!this.titolo) this.titolo = "inizio";
    //if (!this.deliverable) this.deliverable = new Deliverable();
    return { };
  },
  created() {
    console.log("Deliverable.created");
    //this.deliverable = new Deliverable();
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
  background-color: cornsilk;
  margin: 0.4%;
}
</style>