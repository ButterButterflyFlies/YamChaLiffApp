import { mount } from "@vue/test-utils";
import CreateOrderSearch from "../src/components/CreateOrder.vue";

describe("CreateOrderSearch", () => {
  const wrapper = mount(CreateOrderSearch);
  
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  // test("has all params", () => {
    
  //   expect()
  // });

  // send get  request

});
