<template>
  <!-- Use `vue-html` snippets here -->
  <c-box
    w="100%"
    h="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <c-button> Chakra Consumed! </c-button>
    <draggable
      class="list-group"
      tag="ul"
      v-model="list"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <li
          class="list-group-item"
          v-for="element in list"
          :key="element.order"
        >
          <i
            :class="
              element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
            "
            @click="element.fixed = !element.fixed"
            aria-hidden="true"
          ></i>
          {{ element.name }}
        </li>
      </transition-group>
    </draggable>
    <div>Count: {{ count }}</div>
    <c-stack :spacing="5" my="5" is-inline>
      <c-button @click="increment">+</c-button>
      <c-button @click="decrement">-</c-button>
    </c-stack>
    <c-text mb="4">Nama: {{ name }}</c-text>
    <c-button @click="logout">Logout</c-button>
  </c-box>
</template>

<script>
import { CBox, CButton, CStack, CText } from "@chakra-ui/vue";
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import draggable from "vuedraggable";

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs",
];

export default {
  name: "ChakraDemo",
  order: 7,
  components: {
    CBox,
    CButton,
    CStack,
    CText,
    draggable,
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false,
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
    ...mapMutations(["increment", "decrement"]),
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
    ...mapState(["count"]),
    ...mapState("auth", {
      name: (state) => state.user.name,
    }),
    ...mapGetters(["countText"]),
    // count() {
    //   return this.$store.state.count;
    // },
  },
};
</script>
