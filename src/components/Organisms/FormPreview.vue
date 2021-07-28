<template>
  <c-stack v-if="form" bg="white" rounded="md" mt="6" p="6" :spacing="6">
    <c-stack>
      <c-heading as="h1" size="xl">{{ form.title }}</c-heading>
      <c-text>{{ form.description }}</c-text>
    </c-stack>
    <c-breadcrumb separator="›" v-if="form.steps.length > 1">
      <c-breadcrumb-item
        v-for="(stepData, index) in form.steps"
        :key="stepData.id"
        :isCurrentPage="step === index"
        :fontWeight="step === index ? 'bold' : 'regular'"
      >
        <c-breadcrumb-link @click="gotoStep(index)" href="#">{{
          stepData.title
        }}</c-breadcrumb-link>
      </c-breadcrumb-item>
    </c-breadcrumb>
    <ValidationObserver v-slot="{ handleSubmit, failed }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <c-alert status="error" v-show="failed" mb="4">
          <c-alert-icon />
          <c-alert-title :mr="2">Warning!</c-alert-title>
          <c-alert-description>Some fields are invalid!</c-alert-description>
        </c-alert>
        <c-stack
          :spacing="4"
          v-for="(stepData, stepIndex) in form.steps"
          :key="stepData.id"
          v-show="stepIndex === step"
        >
          <c-box v-for="(item, index) in stepData.items" :key="index">
            <text-input
              v-if="item.formInput === 'text'"
              :name="item.label"
              :rules="item.validation"
              :label="item.label"
              :placeholder="item.placeholder"
              :helperText="item.helper"
              v-model="formValues[index]"
            />
            <rich-text-input
              v-if="item.formInput === 'rich'"
              :name="item.label"
              :rules="item.validation"
              :label="item.label"
              :placeholder="item.placeholder"
              :helperText="item.helper"
              v-model="formValues[index]"
            />
            <select-input
              v-if="item.formInput === 'dropdown'"
              :name="item.label"
              :options="createOptions(item.options)"
              :rules="item.validation"
              :label="item.label"
              :placeholder="item.placeholder"
              :helperText="item.helper"
              v-model="formValues[index]"
            />
          </c-box>
          <c-stack is-inline justifyContent="flex-end" w="full"
            ><c-button
              v-if="isHaveNextStep"
              type="button"
              @click="nextStep"
              bg="blue.600"
              color="white"
              >Continue</c-button
            ><c-button
              v-if="isHaveBackStep"
              type="button"
              @click="backStep"
              bg="red.500"
              color="white"
              >Back</c-button
            ><c-button v-if="isSubmit" type="submit" bg="blue.600" color="white"
              >Submit</c-button
            ></c-stack
          >
        </c-stack>
      </form>
    </ValidationObserver>
  </c-stack>
</template>

<script>
import {
  CBox,
  CStack,
  CHeading,
  CText,
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbLink,
  CButton,
  CAlert,
  CAlertIcon,
  CAlertTitle,
  CAlertDescription,
} from "@chakra-ui/vue";
import TextInput from "@/components/Atoms/TextInput";
import SelectInput from "@/components/Atoms/SelectInput";
import RichTextInput from "@/components/Atoms/RichTextInput";

export default {
  name: "FormPreview",
  components: {
    CBox,
    CStack,
    CHeading,
    CText,
    CBreadcrumb,
    CBreadcrumbItem,
    CBreadcrumbLink,
    TextInput,
    CButton,
    SelectInput,
    CAlert,
    CAlertIcon,
    CAlertTitle,
    CAlertDescription,
    RichTextInput,
  },
  data: function () {
    return {
      step: 0,
      formValues: {},
    };
  },
  props: {
    form: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  methods: {
    nextStep: function () {
      this.step = this.step + 1;
    },
    backStep: function () {
      this.step = this.step - 1;
    },
    gotoStep: function (index) {
      this.step = index;
    },
    createOptions: function (items) {
      return items.map((item) => {
        return {
          label: item,
          value: item,
        };
      });
    },
    onSubmit: function () {
      this.$toast({
        title: "Success!",
        description: "Form submitted!",
        status: "success",
        duration: 5000,
      });
    },
  },
  computed: {
    activeStep: function () {
      return this.form.steps[this.step];
    },
    isHaveNextStep: function () {
      return (
        this.form.steps.length > 1 && this.step < this.form.steps.length - 1
      );
    },
    isHaveBackStep: function () {
      return this.form.steps.length > 1 && this.step > 0;
    },
    isSubmit: function () {
      return this.form.steps.length - 1 === this.step;
    },
  },
};
</script>
