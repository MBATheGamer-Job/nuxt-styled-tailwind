<template>
  <DataTable v-model:filters="filters" :value="mails" paginator :rows="150"
    :rows-per-page-options="[50, 150, 500, 1000]" :table-style="{ 'min-width': '50rem' }" showGridlines dataKey="id"
    filterDisplay="menu" :globalFilterFields="['name', 'email', 'recency', 'seniority', 'status']">
    <template #header>
      <div class="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
        </IconField>
      </div>
    </template>

    <Column field="name" header="Name" sortable>
      <template #body="{ data }">
        {{ data.name }}
      </template>

      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
      </template>
    </Column>
    <Column field="email" header="Email" sortable>
    </Column>
    <Column field="recency" header="Recency" sortable>
      <template #body="slotProps">
        {{ slotProps.data.recency.toString().split("T")[0] }}
      </template>
    </Column>
    <Column field="seniority" header="Seniority" sortable>
      <template #body="slotProps">
        {{ slotProps.data.recency.toString().split("T")[0] }}
      </template>
    </Column>
    <Column field="occurrence" header="occurrence" sortable>
      <template #body="{ data }">
        {{ data.occurrence }}
      </template>

      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
      </template>
    </Column>
    <Column field="sender" header="sender" sortable>
      <template #body="{ data }">
        {{ data.sender }}
      </template>

      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
      </template>
    </Column>
    <Column field="recipient" header="recipient" sortable>
    </Column>
    <Column field="conversations" header="Conversations" sortable>
    </Column>
    <Column field="replied_conversations" header="Replied conversations" sortable>
    </Column>
    <Column field="tags" header="Tags" sortable>

      <template #body="slotProps">
        <Tag v-for="tag of slotProps.data.tags" :value="tag" severity="success" />
      </template>
    </Column>
    <Column field="status" header="Status" sortable>

      <template #body="slotProps">
        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { getStatusLabel } from "~/utils";
import { ref } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const filters = ref();

const supabase = useSupabaseClient();

const { data: contacts } = await useAsyncData('contacts', () => supabase.rpc('get_contacts_table', {
  userid: process.env.USER_ID
}));

const mails = computed(() => contacts.value.data);

console.log(mails);

const initFilters = () => {
  filters.value = {
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH
        }
      ]
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH
        }
      ]
    },
    recency: {
      operator:
        FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.DATE_IS
        }
      ]
    },
    seniority: {
      operator:
        FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.DATE_IS
        }
      ]
    },
    occurrence: {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
      ]
    },
    sender: {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
      ]
    },
    recipient: {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
      ]
    },
    conversations: {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
      ]
    },
    replies: {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
      ]
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [
        {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
      ]
    },
  };
};

initFilters();

const clearFilter = () => {
  initFilters();
};
</script>
