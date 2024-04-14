import { mount } from "@vue/test-utils";
import AppInput from "@/components/base/AppInput.vue";

describe("AppInput", () => {
  const labelValue = "hello";
  const insertedInputValue = "testing input";

  const wrapper = mount(AppInput, {
    propsData: {
      label: labelValue,
      modelValue: "",
    },
  });

  it("renders properly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders label", async () => {
    const label = wrapper.find("label").text();
    expect(label).toBe(labelValue);
  });

  it("does not display required symbole by default", async () => {
    const requiredLabel = wrapper.find('[data-test="label-required"]');

    expect(requiredLabel.exists()).toBeFalsy();
  });

  it("displays required symbol", async () => {
    const requiredWrapper = mount(AppInput, {
      propsData: {
        label: labelValue,
        required: true,
      },
    });
    const requiredLabel = requiredWrapper.find('[data-test="label-required"]');

    expect(requiredLabel.exists()).toBeTruthy();
  });

  it("emits an event with user data payload", () => {
    const input = wrapper.find("input");
    input.setValue(insertedInputValue);
    const formSubmittedCalls = wrapper.emitted("update:modelValue");
    expect(formSubmittedCalls).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(insertedInputValue);
  });

  it("disable input", async () => {
    await wrapper.setProps({ disabled: true });
    const select = wrapper.find("input");
    expect(select.element.className).toContain("disabled");
  });

  it("renders error message", async () => {
    await wrapper.setProps({
      error: true,
      errormessage: "test",
    });
    const errorLabel = wrapper.find('[data-test="label-error"]');
    expect(errorLabel.exists()).toBeTruthy();
    expect(errorLabel.text()).toBe("test");

    const select = wrapper.find("input");
    expect(select.element.className).toContain("inputError");
  });
});
