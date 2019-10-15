import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import AddItem from "../components/AddItem.vue";
import Menu from "../components/Menu.vue";

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      name: "hello",
      component: HelloWorld
    },
    {
      path: "/product",
      name: "product",
      component: AddItem
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu
    }
  ]
});