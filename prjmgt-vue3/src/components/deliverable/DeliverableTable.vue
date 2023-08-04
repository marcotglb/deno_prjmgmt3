<template>
  <DataTable
    :value="elements"
    class="p-datatable-sm"
    selectionMode="single"
    dataKey="id"
    :scrollable="true"
    :resizableColumns="true"
    scrollHeight="flex"
    :loading="loading"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="['title', 'what']"
  >
    <template #header>
      <div class="p-d-flex p-jc-between">
        <Button
          type="button"
          icon="pi pi-angle-up"
          class="p-button-outlined"
          label="Up"
          @Click="goUp()"
        />
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          class="p-button-outlined"
          @click="clearFilters()"
        />
        <span class="p-input-icon-right">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            placeholder="Keyword Search"
          />
        </span>
      </div>
    </template>
    <Column field="id" header="Id" class="smallCodeField"></Column>
    <Column
      header="Sons"
      class="p-button-outlined sonsField"
      bodyStyle="overflow: visible"
    >
      <template #body="{ data }">
        <Button
          type="button"
          class="p-button-outlined p-button-secondary"
          @click="go2Sons(data.id)"
          >{{ data.sons }}</Button
        >
      </template>
    </Column>
    <Column field="title" header="Title" sortable class="titleField">
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </Column>
    <Column field="status" header="Status"></Column>
    <Column field="effort" header="Effort"></Column>
    <Column field="completed" header="Completed">
      <template #body="{ data }"
        >{{
          new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1 }).format(
            data.completed * 100
          )
        }}%
      </template>
    </Column>
    <Column field="sub_effort" header="_Effort"></Column>
    <Column field="sub_completed" header="_Completed">
      <template #body="{ data }"
        >{{
          new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1 }).format(
            data.sub_completed * 100
          )
        }}%
      </template>
    </Column>
    <Column field="who" header="Who"></Column>
    <Column field="delivered" header="Delivered">
      <template #body="{ data }">{{
        new Date(data.delivered).toLocaleTimeString("it-IT", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      }}</template>
    </Column>
    <Column field="what" header="What" sortable>
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { inject } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
//import Deliverable from "../../../services/Deliverable";
//import router from "@/router"; //
import { mapGetters, mapActions, mapMutations } from "vuex";
//import store from '../../store/Store.js'
//import mitt from 'mitt'
//const emitter = mitt();

export default {
  emits: ["deliverable-selected"],
  inject: ["eventBus"],
  props: ["top"],

  /*
  watch: {
    async top(top, oldValue) {
      this.loading = true;
      console.log("reloading ...top=", top, oldValue);
      // this.deliverables = await this.deliverable.get({ top: top });
      console.log(
        `DeliverableTable.watch top=${this.top} this.root=${this.root}`
      );
      if (this.top != this.root) {
        this.fetchElements({ top: this.top });
        this.setRoot(this.top);
      }
      this.loading = false;
    },
  },
  */
  data() {
    console.log("DeliverableTable.data. top=", this.top);
    return {
      //deliverables: null,
      filters: null,
      loading: this.loading,
    };
  },
  //deliverable: null,
  loading: false,

  /*
  async mounted() {
    console.log("DeliverableTable.mounted");
    this.loading = true;
    this.deliverables = await this.deliverable.get({ top: this.top });
    this.loading = false;
  },
  */

  computed: {
    ...mapGetters("deliverable", ["elements"]),
  },

  methods: {
    ...mapActions("deliverable", ["fetchElements"]),
    ...mapMutations("deliverable", [
      "setSelected",
      "setRoot",
      "pushTop",
      "popTop"
    ]),
    onRowSelect(event) {
      console.log(event.data);
      // this.$emit("deliverable-selected", { ...event.data });
      this.setSelected({ ...event.data });
    },

    onRowUnselect(event) {
      console.log(event.data);
    },

    goUp(event) {
      this.popTop(Number(event));
      this.fetchElements(/*{ top: this.top }*/);
    },
    go2Sons(event) {
      console.log("btnClick()", event);
      this.pushTop(Number(event));
      this.fetchElements(/*{ top: this.top }*/);
      //router.push({ name: "Deliverables", params: { top: new Number(event) } });
      //router.go({ name: "Deliverables", params: { top: event } });
    },
    clearFilters() {
      this.filters = {
        global: { what: null, matchMode: FilterMatchMode.CONTAINS },
        title: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        what: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
  },

  created() {
    console.log("DeliverableTable.created");
    this.emitter = inject("emitter", "emitter");
    console.log(this.emitter);
    this.clearFilters();
    this.fetchElements();
  },
};
</script>


<style scoped>
.smallCodeField {
  color: blue;
  text-align: right;
  max-width: max-content;
}
.sonsField {
  color: blue;
  text-align: right;
  max-width: max-content;
}
.titleField {
  text-align: right;
  max-width: 10%;
}
.p-datatable {
  resize: horizontal;
}
</style>
