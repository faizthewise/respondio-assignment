import AppButton from "@/components/base/AppButton.vue";
import AppSpinner from "@/components/base/AppSpinner.vue";
import { mount } from "@vue/test-utils";

describe("AppButton", () => {
  const wrapper = mount(AppButton);
  it("renders properly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Hide spinner in button when not loading", () => {
    wrapper.setProps({ loading: false });
    expect(wrapper.findComponent(AppSpinner).exists()).toBe(false);
  });

  it("Show spinner in button when loading", async () => {
    await wrapper.setProps({ loading: true });
    expect(wrapper.findComponent(AppSpinner).exists()).toBe(true);
  });

  it("Display correct class attributes based on theme", async () => {
    await wrapper.setProps({ theme: "primary" });
    expect(wrapper.classes()).toContain("primary");
    await wrapper.setProps({ theme: "secondary" });
    expect(wrapper.classes()).toContain("secondary");
    await wrapper.setProps({ theme: "danger" });
    expect(wrapper.classes()).toContain("danger");
  });
});
