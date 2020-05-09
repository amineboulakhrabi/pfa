import DropDown from "./components/Dropdown.vue";
import EspaceChart from "./components/Charts/EspaceChart.vue";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.component("espace-chart",EspaceChart);
  }
};

export default GlobalComponents;
