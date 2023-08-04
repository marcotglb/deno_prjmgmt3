<template>
  <DataTable
    :value="users"
    class="p-datatable-sm"
    selectionMode="single"
    dataKey="id"
    :scrollable="true"
    :resizableColumns="true"
    scrollHeight="100%"
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
          icon="pi pi-filter-slash"
          label="Clear"
          class="p-button-outlined"
          @click="clearFilter()"
        />
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            placeholder="Keyword Search"
          />
        </span>
      </div>
    </template>
    <Column
      field="id"
      header="Id"
      class="smallCodeField"
    ></Column>
    <Column field="title" header="Title" sortable>
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
    <Column field="firstname" header="First Name" ></Column>
    <Column field="username" header="Last Name"> </Column>
    
  </DataTable>
</template>

<script>
import { inject } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import user from '../../../services/User';
import router from "@/router"; //

//import mitt from 'mitt'
//const emitter = mitt();

export default {
  emits: ["user-selected"],
  inject: ["eventBus"],
  props: ["top", "elValue"],
  watch: {
    async top(top) {
      this.loading = true;
      console.log("reloading ...top=", top);
      this.users = await this.user.get({ top: top });
      this.loading = false;
    },
  },
  data() {
    console.log("userTable.data. top=", this.top);
    return {
      users: null,
      filters: null,
      loading: this.loading,
    };
  },
  //user: null,
  loading: false,
  created() {
    console.log("userTable.created");
    this.emitter = inject("emitter", "emitter");
    console.log(this.emitter);
    this.initFilters();
    this.user = new user();
  },
  async mounted() {
    console.log("userTable.mounted");
    this.loading = true;
    this.users = await this.user.get({ top: this.top });
    this.loading = false;
    /*
    this.users = [
      { code: "123", name: "piumino", category: "piume", quantity: 34 },
      { code: "124", name: "spazzolone", category: "spazzole", quantity: 34 },
      { code: "125", name: "piuma", category: "piume", quantity: 34 },
    ];
    */
  },

  methods: {
    onRowSelect(event) {
      console.log(event.data);
      // this.$emit('obj-selected', {...event.data})
      //this.eventBus.emit("deiverableSelected", { ...event.data });
      this.$emit("el-selected", { ...event.data });
      //console.log('elValue.value:', this.elValue.value)
    },

    onRowUnselect(event) {
      console.log(event.data);
    },

    go2Sons(event, data) {
      console.log("btnClick()", event, data);
      router.push({ name: "users", params: { top: event } });
      //router.go({ name: "users", params: { top: event } });
    },
    clearFilter() {
      this.initFilters();
    },
    initFilters() {
      this.filters = {
        global: { username: null, matchMode: FilterMatchMode.CONTAINS },
        username: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        }
      };
    },
  },
};
</script>


<style>
.smallCodeField {
  color: blue;
  text-align:right;
  width:max-content;
}
.p-datatable {
  resize: horizontal;
}
</style>
