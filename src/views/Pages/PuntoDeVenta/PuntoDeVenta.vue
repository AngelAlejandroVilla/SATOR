<template>
  <div>
    <div class="py-5">
      <div class="table-responsive">
        <h1 class="text-center">Administrar Clientes</h1>
        <div class="p-5">
          <a
            href="#"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal_add_customer"
          >
            <i class="bi bi-plus-lg fs-1"
              ><span class="path1"></span><span class="path2"></span
              ><span class="path3"></span><span class="path4"></span
            ></i>
            Agregar Cliente
          </a>
        </div>
        <table class="table table-row-dashed table-row-gray-300 gy-7">
          <thead>
            <tr class="fw-bold fs-6 text-gray-800">
              <th>CODE</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Repartidor</th>
              <th>Precios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cliente, index) in clientes">
              <td>{{ cliente.Code }}</td>
              <td>{{ cliente.Name }}</td>
              <td>{{ cliente.Direccion }}</td>
              <td>{{ cliente.Telefono }}</td>
              <td>{{ cliente.Repartidor }}</td>
              <td><a class="btn btn-primary">Ver Precios</a></td>
              <td>
                <div>
                  <a
                    class="bi bi-pencil fs-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_add_customer"
                  ></a>
                  <a
                    class="bi bi-trash3 fs-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_add_customer"
                  ></a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <AddCustomerModal :refresh-info="getClientes" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import { apiApp } from "@/core/api/apiApp";

interface Cliente {
  Code: string;
  Name: string;
  Direccion: string;
  Telefono: string;
  Repartidor: string;
  Valor: string;
}

export default defineComponent({
  name: "Customers",
  components: {
    AddCustomerModal,
  },

  setup() {
    const clientes = ref<Cliente[]>([]);

    onMounted(async () => {
      await getClientes();
    });

    const getClientes = async () => {
      // obtener clientes
      await apiApp.get("TCustomer/Customers/10").then((res) => {
        clientes.value = res.data;
      });
    };

    return {
      clientes,
      getClientes,
    };
  },
});
</script>
