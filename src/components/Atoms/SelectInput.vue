<template>
  <ValidationProvider tag="div" :name="name" :rules="rules" v-slot="{ errors }">
    <c-form-control :is-invalid="errors.length > 0">
      <c-form-label>{{ label }}</c-form-label>
      <c-select v-model="inputVal" :placeholder="placeholder">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </c-select>
      <c-form-helper-text v-show="helperText">{{
        helperText
      }}</c-form-helper-text>
      <c-form-error-message>{{ errors[0] }}</c-form-error-message>
    </c-form-control>
  </ValidationProvider>
</template>

<script>
import {
  CSelect,
  CFormControl,
  CFormLabel,
  CFormErrorMessage,
  CFormHelperText,
} from "@chakra-ui/vue";
export default {
  name: "SelectInput",
  components: {
    CSelect,
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: String,
    label: String,
    value: String,
    placeholder: String,
    helperText: String,
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
