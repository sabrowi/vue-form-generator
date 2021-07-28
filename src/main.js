import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Chakra, { CThemeProvider, CReset } from "@chakra-ui/vue";
import { firestorePlugin } from "vuefire";
import {
  faSignOutAlt,
  faTrash,
  faEdit,
  faGripHorizontal,
  faGripLinesVertical,
  faFolderOpen,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

Vue.use(Chakra, {
  icons: {
    iconPack: "fa",
    iconSet: {
      faSignOutAlt,
      faTrash,
      faEdit,
      faGripHorizontal,
      faGripLinesVertical,
      faFolderOpen,
      faEye,
    },
  },
});
Vue.use(firestorePlugin);
// Vue.use(VeeValidate);

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
extend("arrayCheck", (value) => {
  return value.length > 3;
});
localize("en", en);

// Install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)]),
}).$mount("#app");
