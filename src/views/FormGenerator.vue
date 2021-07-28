<template>
  <layout>
    <c-box mb="4" d="flex" justifyContent="space-between" alignItems="center">
      <c-heading size="lg"> {{ formName }} Form </c-heading>
      <c-stack is-inline>
        <c-button
          type="submit"
          form="form-generator"
          bg="blue.600"
          color="white"
          :isLoading="loading"
          >Save</c-button
        >
        <c-button @click="cancel" bg="red.500" color="white">Cancel</c-button>
      </c-stack>
    </c-box>

    <c-tabs variant="soft-rounded" variant-color="blue" align="center">
      <c-tab-list>
        <c-tab>Form Generator</c-tab>
        <c-tab>Preview</c-tab>
      </c-tab-list>
      <c-tab-panels>
        <c-tab-panel>
          <ValidationObserver v-slot="{ handleSubmit, failed }">
            <form id="form-generator" @submit.prevent="handleSubmit(onSubmit)">
              <c-stack :spacing="8" pt="6">
                <c-alert status="error" v-show="failed">
                  <c-alert-icon />
                  <c-alert-title :mr="2">Warning!</c-alert-title>
                  <c-alert-description
                    >Some fields are invalid!</c-alert-description
                  >
                </c-alert>
                <c-stack :spacing="3">
                  <c-box
                    ><text-input
                      label="Form title"
                      name="title"
                      v-model="form.title"
                      rules="required"
                  /></c-box>
                  <c-form-control>
                    <c-form-label>Description</c-form-label>
                    <c-textarea
                      v-model="form.description"
                      :value="form.description"
                    />
                  </c-form-control>
                </c-stack>

                <c-button bg="blue.600" color="white" @click="addNewStep"
                  >Add new step</c-button
                >
                <c-tabs
                  variant="soft-rounded"
                  variant-color="blue"
                  :key="form.steps.length"
                >
                  <c-tab-list>
                    <c-tab v-for="(step, index) in form.steps" :key="step.id">{{
                      `Step ${index + 1}`
                    }}</c-tab>
                  </c-tab-list>
                  <c-tab-panels>
                    <c-tab-panel
                      v-for="(step, stepIndex) in form.steps"
                      :key="step.id"
                    >
                      <c-stack py="6" :spacing="6">
                        <c-box
                          ><text-input
                            :name="`stepTitle.${stepIndex}`"
                            label="Step title"
                            v-model="step.title"
                            rules="required"
                        /></c-box>
                        <c-stack :spacing="5">
                          <draggable
                            class="list-group"
                            tag="div"
                            handle=".handle"
                            v-model="step.items"
                            v-bind="dragOptions"
                            @start="drag = true"
                            @end="drag = false"
                          >
                            <transition-group
                              type="transition"
                              :name="!drag ? 'flip-list' : null"
                            >
                              <form-generator-item
                                v-for="(
                                  formControl, formControlIndex
                                ) in step.items"
                                :key="formControl.order"
                                :value="formControl"
                                :stepIndex="stepIndex"
                                :formControlIndex="formControlIndex"
                                @input="updateFormControlValue"
                                @remove="removeFormItem"
                              />
                            </transition-group>
                          </draggable>
                        </c-stack>
                        <c-stack is-inline>
                          <c-button
                            @click="addFormItem(stepIndex)"
                            flex="1"
                            bg="blue.600"
                            color="white"
                            >Add Field</c-button
                          >
                          <c-button
                            @click="deleteStep(stepIndex)"
                            :disabled="form.steps.length < 2"
                            flex="1"
                            bg="red.600"
                            color="white"
                            >Delete Step</c-button
                          >
                        </c-stack>
                      </c-stack>
                    </c-tab-panel>
                  </c-tab-panels>
                </c-tabs>
              </c-stack>
            </form>
          </ValidationObserver>
        </c-tab-panel>
        <c-tab-panel>
          <form-preview :form="form" />
        </c-tab-panel>
      </c-tab-panels>
    </c-tabs>
  </layout>
</template>

<script>
import {
  CFormControl,
  CFormLabel,
  CTextarea,
  CStack,
  CBox,
  CTabs,
  CTabList,
  CTabPanels,
  CTab,
  CTabPanel,
  CHeading,
  CButton,
  CAlert,
  CAlertIcon,
  CAlertTitle,
  CAlertDescription,
} from "@chakra-ui/vue";
import s from "shortid";
import firebase from "../plugins/firebase";
import draggable from "vuedraggable";
import Layout from "@/components/Templates/Layout";
import TextInput from "@/components/Atoms/TextInput";
import FormGeneratorItem from "@/components/Molecules/FormGeneratorItem";
import FormPreview from "@/components/Organisms/FormPreview";

const db = firebase.firestore();

export default {
  name: "FormGenerator",
  components: {
    Layout,
    TextInput,
    CFormControl,
    CFormLabel,
    CTextarea,
    CStack,
    CBox,
    CTabs,
    CTabList,
    CTabPanels,
    CTab,
    CTabPanel,
    CHeading,
    CButton,
    FormGeneratorItem,
    CAlert,
    CAlertIcon,
    CAlertTitle,
    CAlertDescription,
    draggable,
    FormPreview,
  },
  data: function () {
    return {
      form: {
        title: "",
        description: "",
        steps: [
          {
            id: s.generate(),
            title: "",
            items: [
              {
                label: "",
                formInput: "",
                validation: "",
                helper: "",
                placeholder: "",
                options: [],
                order: 1,
              },
            ],
          },
        ],
      },
      drag: false,
      loading: false,
      isNew: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    formName: function () {
      return this.isNew ? "Add new" : "Edit";
    },
  },
  mounted: async function () {
    const { slug } = this.$route.params;
    if (slug === "new") {
      this.isNew = true;
    } else {
      await this.getFormData(slug);
    }
  },
  methods: {
    cancel: function () {
      this.$router.push("/list-form");
    },
    getFormData: async function (id) {
      this.loading = true;
      const formsRef = db.collection("forms").doc(id);
      const doc = await formsRef.get();
      this.form = doc.data();
      this.loading = false;
    },
    addNewStep: function () {
      const newStep = {
        title: "",
        items: [
          {
            label: "",
            formInput: "",
            validation: "",
            helper: "",
            placeholder: "",
            options: [],
            order: 1,
          },
        ],
      };
      const steps = [...this.form.steps, newStep];
      this.$set(this.form, "steps", steps);
    },
    deleteStep: function (index) {
      const steps = [...this.form.steps];
      steps.splice(index, 1);
      this.$set(this.form, "steps", steps);
    },
    addFormItem: function (stepIndex) {
      const steps = [...this.form.steps];
      const newItems = {
        id: s.generate(),
        label: "",
        formInput: "",
        validation: "",
        helper: "",
        placeholder: "",
        options: [],
        order: steps[stepIndex].items.length + 1,
      };
      const items = [...steps[stepIndex].items, newItems];
      steps[stepIndex].items = items;
      this.$set(this.form, "steps", steps);
    },
    removeFormItem: function ({ stepIndex, formControlIndex }) {
      const steps = [...this.form.steps];
      const items = [...steps[stepIndex].items];
      items.splice(formControlIndex, 1);
      steps[stepIndex].items = items;
      this.$set(this.form, "steps", steps);
    },
    updateFormControlValue: function ({ stepIndex, formControlIndex, value }) {
      const steps = [...this.form.steps];
      steps[stepIndex].items[formControlIndex] = value;
      this.$set(this.form, "steps", steps);
    },
    addNewForm: async function (values) {
      const formsRef = db.collection("forms").doc();
      await formsRef.set(values);
    },
    editForm: async function (values, id) {
      const formsRef = db.collection("forms").doc(id);
      await formsRef.update(values);
    },
    onSubmit: async function () {
      try {
        const values = JSON.parse(JSON.stringify(this.form));
        this.loading = true;
        if (this.isNew) {
          this.addNewForm(values);
        } else {
          const { slug } = this.$route.params;
          this.editForm(values, slug);
        }
        this.loading = false;
        this.$toast({
          title: "Success!",
          description: this.isNew ? "Form created!" : "Form updated!",
          status: "success",
          duration: 5000,
        });
        if (this.isNew) {
          this.$router.push("/list-form");
        }
      } catch (error) {
        this.loading = false;
        this.$toast({
          title: "Error!",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      }
    },
  },
};
</script>
