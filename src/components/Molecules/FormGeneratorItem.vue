<template>
  <c-stack
    bg="white"
    rounded="lg"
    pl="12"
    pr="10"
    py="8"
    mb="8"
    position="relative"
  >
    <c-close-button
      @click="remove"
      right="2"
      top="2"
      position="absolute"
      type="button"
    />
    <c-icon
      class="handle"
      h="1.5rem"
      left="2"
      top="45%"
      name="grip-lines-vertical"
      position="absolute"
    />
    <c-stack is-inline justifyContent="flex-start">
      <c-box flex="1">
        <text-input
          :name="`label.${stepIndex}.${formControlIndex}`"
          label="Label"
          type="text"
          v-model="label"
          rules="required"
        />
      </c-box>
      <c-box flex="1">
        <select-input
          v-model="formInput"
          placeholder="Select form input"
          :name="`formInput.${stepIndex}.${formControlIndex}`"
          label="Form Input"
          rules="required"
          :options="formInputOptions"
        />
      </c-box>
    </c-stack>
    <options-input
      v-if="formInput === 'dropdown'"
      label="Options data"
      helper="Add minimal 2 options, type and enter to add new option."
      v-model="options"
    />
    <c-stack is-inline>
      <c-box flex="1">
        <text-input
          :name="`placeholder.${stepIndex}.${formControlIndex}`"
          label="Placeholder"
          type="text"
          v-model="placeholder"
        />
      </c-box>
      <c-box flex="1">
        <text-input
          :name="`validation.${stepIndex}.${formControlIndex}`"
          label="Helper text"
          type="text"
          v-model="helper"
        />
      </c-box>
    </c-stack>

    <c-box flex="1">
      <text-input
        name="validation"
        label="Validation rules"
        type="text"
        v-model="validation"
        helperText="Validation rules guide: https://vee-validate.logaretm.com/v3/guide/rules.html#rules"
      />
    </c-box>
  </c-stack>
</template>

<style scoped>
.handle {
  cursor: pointer;
}
</style>

<script>
import { CStack, CBox, CCloseButton, CIcon } from "@chakra-ui/vue";

import TextInput from "@/components/Atoms/TextInput";
import SelectInput from "@/components/Atoms/SelectInput";
import OptionsInput from "@/components/Atoms/OptionsInput";

export default {
  name: "FormGeneratorItem",
  components: {
    CStack,
    CBox,
    CCloseButton,
    TextInput,
    SelectInput,
    CIcon,
    OptionsInput,
  },
  props: ["value", "formControlIndex", "stepIndex"],
  data: function () {
    return {
      formInputOptions: [
        { label: "Text Input", value: "text" },
        { label: "Dropdown", value: "dropdown" },
        { label: "Rich Text Input", value: "rich" },
      ],
    };
  },
  methods: {
    remove: function () {
      this.$emit("remove", {
        formControlIndex: this.formControlIndex,
        stepIndex: this.stepIndex,
      });
    },
  },
  computed: {
    label: {
      get() {
        return this.value.label;
      },
      set(val) {
        const newValue = { ...this.value, label: val };
        this.$emit("input", {
          value: newValue,
          formControlIndex: this.formControlIndex,
          stepIndex: this.stepIndex,
        });
      },
    },
    formInput: {
      get() {
        return this.value.formInput;
      },
      set(val) {
        const newValue = { ...this.value, formInput: val };
        this.$emit("input", {
          value: newValue,
          formControlIndex: this.formControlIndex,
          stepIndex: this.stepIndex,
        });
      },
    },
    placeholder: {
      get() {
        return this.value.placeholder;
      },
      set(val) {
        const newValue = { ...this.value, placeholder: val };
        this.$emit("input", {
          value: newValue,
          formControlIndex: this.formControlIndex,
          stepIndex: this.stepIndex,
        });
      },
    },
    validation: {
      get() {
        return this.value.validation;
      },
      set(val) {
        const newValue = { ...this.value, validation: val };
        this.$emit("input", {
          value: newValue,
          formControlIndex: this.formControlIndex,
          stepIndex: this.stepIndex,
        });
      },
    },
    helper: {
      get() {
        return this.value.helper;
      },
      set(val) {
        const newValue = { ...this.value, helper: val };
        this.$emit("input", {
          value: newValue,
          formControlIndex: this.formControlIndex,
          stepIndex: this.stepIndex,
        });
      },
    },
    options: {
      get() {
        return this.value.options;
      },
      set(val) {
        const newValue = { ...this.value, options: val };
        this.$emit("input", {
          value: newValue,
          formControlIndex: this.formControlIndex,
          stepIndex: this.stepIndex,
        });
      },
    },
  },
};
</script>
