<template>
  <DataTable
    :value="elements"
    class="p-datatable-sm"
    selectionMode="single"
    dataKey="id"
    :scrollable="true"
    scrollHeight="flex"
    :resizableColumns="true"
    :loading="loading"
    @rowSelect="(event) => context.emit('selectedElement', event)"
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
          @Click="context.emit('goUp', event)"
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
    <Column field="org_id" header="org_Id" class="smallCodeField"></Column>
    <Column field="username" header="Username" sortable class="titleField">
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </Column>
    <Column field="firstname" header="First Name"></Column>
    <Column field="lastname" header="Last Name" sortable>
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by name"
        />
      </template>
    </Column>
    <Column field="email" header="eMail"></Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { ref } from "vue";

export default {
  props: {
    elements: Array
  },

  setup(props, context) {

    const loading = ref(false);

    function onRowUnselect(event) {
      console.log(event.data);
    }

    function go2Sons(event, data) {
      console.log("btnClick()", event, data);
      this.pushTop(Number(event));
      this.users.fetchElements(/*{ top: this.top }*/);
    }

    const filterBase = {
      global: { what: null, matchMode: FilterMatchMode.CONTAINS },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      what: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    };
    let filters = filterBase;
    function clearFilters() {
      filters = filterBase;
    }

    return {
      context,
      filters,
      loading,
      onRowUnselect,
      go2Sons,
      clearFilters,
    };
  },

  computed: {
  },

  methods: {
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
