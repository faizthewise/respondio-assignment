import { mount } from "@vue/test-utils";
import AppModal from "@/components/base/AppModal.vue";

describe("AppModal", () => {
  it("renders properly", () => {
    const wrapper = mount(AppModal);
    expect(wrapper.exists()).toBe(true);
  });

  it("display correct title", () => {
    const title = "12345";
    const wrapper = mount(AppModal, {
      props: {
        title,
      },
    });

    const titleElement = wrapper.find('[data-test="title"]');
    expect(titleElement.text()).toBe(title);
  });

  it("display modal based on visible props", async () => {
    const wrapper = mount(AppModal, {
      props: {
        visible: true,
      },
    });

    const container = wrapper.find('[data-test="modal-container"]');
    expect(container.isVisible()).toBe(true);

    await wrapper.setProps({ visible: false });

    const container2 = wrapper.find('[data-test="modal-container"]');
    expect(container2.isVisible()).toBe(false);
  });
});
