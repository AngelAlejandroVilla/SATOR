<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newCustomerModalRef"
    id="modal_add_customer"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <VForm
          class="form"
          id="kt_modal_new_address_form"
          @submit="submit()"
          :validation-schema="validationSchema"
          v-slot="{ errors }"
        >
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_new_address_header">
            <!--begin::Modal title-->
            <h2>Agregar Cliente</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_new_address_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_new_address_header"
              data-kt-scroll-wrappers="#kt_modal_new_address_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-5 fw-semibold mb-2">Nombre</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    type="text"
                    class="form-control"
                    :class="errors.firstName ? 'is-invalid' : ''"
                    placeholder=""
                    name="name"
                    v-model="newAddressData.name"
                  />
                  <ErrorMessage class="invalid-feedback" name="name" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="required fs-5 fw-semibold mb-2">Direccion</label>
                <!--end::Label-->

                <!--begin::Input-->
                <Field
                  class="form-control"
                  :class="errors.address1 ? 'is-invalid' : ''"
                  placeholder=""
                  name="Direccion"
                  v-model="newAddressData.Direccion"
                />
                <ErrorMessage class="invalid-feedback" name="Direccion" />
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row g-9 mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-5 fw-semibold mb-2">Telefono</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Field
                    class="form-control"
                    :class="errors.state ? 'is-invalid' : ''"
                    placeholder=""
                    name="Telefono"
                    v-model="newAddressData.Telefono"
                  />
                  <ErrorMessage class="invalid-feedback" name="Telefono" />
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-5 fw-semibold mb-2">Repartidor</label>
                  <!--end::Label-->
                  <!--begin::Select-->
                  <Field
                    name="Repartidor"
                    class="form-select"
                    :class="errors.country ? 'is-invalid' : ''"
                    as="select"
                    v-model="newAddressData.Repartidor"
                  >
                    <option value="">Selecciona un Repartidor...</option>
                    <option
                      v-for="(item, i) in countries"
                      :key="`countries-select-option-${i}`"
                      :value="item.code"
                    >
                      {{ item.name }}
                    </option>
                  </Field>

                  <ErrorMessage class="invalid-feedback" name="Repartidor" />
                  <!--end::Select-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_new_address_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_new_address_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </VForm>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New Address-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { hideModal } from "@/core/helpers/modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { countries } from "@/core/data/countries";
import { apiApp } from "@/core/api/apiApp";

interface newCustumersData {
  name: string;
  Direccion: string;
  Telefono: string;
  Repartidor: string;
}

export default defineComponent({
  name: "new-address-modal",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  props: {
    refreshInfo: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newCustomerModalRef = ref<null | HTMLElement>(null);

    const newAddressData = ref<newCustumersData>({
      name: "",
      Direccion: "",
      Telefono: "",
      Repartidor: "",
    });

    const validationSchema = Yup.object().shape({
      name: Yup.string().required().label("Nombre"),
      Direccion: Yup.string().required().label("Direccion"),
      Telefono: Yup.string().required().label("Telefono"),
      Repartidor: Yup.string().required().label("Repartidor"),
    });

    const submit = () => {
      console.log("sdrftyguvhbijnokmp,l´ñ.pkmjiohuygftrderucfyigvuhjioñkp{}");
      if (!submitButtonRef.value) {
        return;
      }

      //Disable button
      submitButtonRef.value.disabled = true;
      // Activate indicator
      submitButtonRef.value.setAttribute("data-kt-indicator", "on");

      setTimeout(() => {
        const params = {
          CompanyId: "10",
          Name: newAddressData.value.name,
          Address1: newAddressData.value.Direccion,
          Address2: newAddressData.value.Direccion,
          Phone: newAddressData.value.Telefono,
          Mobile: newAddressData.value.Telefono,
          Active: 1,
          UserId: newAddressData.value.Repartidor,
        };
        apiApp.put("/TCustomer/Customer", params).then((resp) => {
          Swal.fire({
            text: "El Cliente se ha agregado correctamente",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Okey",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            hideModal(newCustomerModalRef.value);
            props.refreshInfo();
          });
        });
      });
    };

    return {
      newAddressData,
      validationSchema,
      submit,
      submitButtonRef,
      newAddressModalRef: newCustomerModalRef,
      getAssetPath,
      countries,
    };
  },
});
</script>
