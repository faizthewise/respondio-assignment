import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "typeface-roboto";
import "./index.pcss";
/* these are necessary styles for vue flow */
import "@vue-flow/core/dist/style.css";
/* this contains the default theme, these are optional styles */
import "@vue-flow/core/dist/theme-default.css";
import { setupCalendar } from "v-calendar";
import "v-calendar/dist/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(setupCalendar, {});

app.mount("#app");
