import { mount } from "@vue/test-utils";
import AppSelect from "@/components/base/AppSelect.vue";

describe("AppSelect", () => {
  const labelValue = "hello";
  const insertedInputValue = "bar";

  const wrapper = mount(AppSelect, {
    propsData: {
      label: labelValue,
      modelValue: "",
      options: ["bar", "foo", "hello"],
    },
  });

  it("renders properlu", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders label", () => {
    const label = wrapper.find("label").text();
    expect(label).toBe(labelValue);
  });

  it("display correct option text - Array of Strings", () => {
    const option = wrapper.find("option");
    expect(option.text()).toBe("bar");
  });

  it("display correct option text and value - Array of Object", async () => {
    const wrapper = mount(AppSelect, {
      propsData: {
        label: labelValue,
        modelValue: "",
        optionKey: "fiid",
        optionValue: "name",
        options: [
          { name: "Maybank", fiid: "MBB" },
          { name: "Citibank", fiid: "CITI" },
        ],
      },
    });
    const option = wrapper.find("option");
    expect(option.text()).toBe("Maybank");
    expect(option.element.value).toBe("MBB");
  });

  it("displays requires symbold", async () => {
    await wrapper.setProps({ required: true });

    const requiredLabel = wrapper.find('[data-test="label-required"]');
    expect(requiredLabel.exists()).toBe(true);
  });

  it("does not render label when showLabel=false", async () => {
    await wrapper.setProps({ showLabel: false });

    const label = wrapper.find("label");
    expect(label.exists()).toBe(false);
  });

  it("emits an event with user data payload", () => {
    // input.setValue(insertedInputValue);
    const options = wrapper.find("select").findAll("option");
    options.at(0).setSelected();
    expect(wrapper.find("option:checked").element.value).toBe(
      insertedInputValue
    );

    const formSubmittedCalls = wrapper.emitted("update:modelValue");
    expect(formSubmittedCalls).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(insertedInputValue);
  });

  it("disables selecy", async () => {
    await wrapper.setProps({ disabled: true });
    const select = wrapper.find("select");
    expect(select.element.className).toContain("disabled");
  });

  it("render error message", async () => {
    await wrapper.setProps({
      error: true,
      errormessage: "test",
    });
    const errorLabel = wrapper.find('[data-test="label-error"]');
    expect(errorLabel.exists()).toBeTruthy();
    expect(errorLabel.text()).toBe("test");

    const select = wrapper.find("select");
    expect(select.element.className).toContain("inputError");
  });

  it("renders placeholder attribute correctly", () => {
    const placeholderText = "Select an item";
    const wrapper = mount(AppSelect, {
      propsData: {
        label: labelValue,
        options: [],
        placeholder: placeholderText,
      },
    });
    expect(wrapper.find("select").attributes("placeholder")).toBe(
      placeholderText
    );
  });

  it("emits correct boolean values on change", async () => {
    const wrapper = mount(AppSelect, {
      propsData: {
        label: labelValue,
        options: ["true", "false"],
      },
    });

    const options = wrapper.find("select").findAll("option");

    options.at(0).setSelected(); // "true"
    expect(wrapper.emitted("update:modelValue")[0]).toEqual([true]);

    options.at(1).setSelected(); // "false"
    expect(wrapper.emitted("update:modelValue")[1]).toEqual([false]);
  });

  it("emits correct number value on change", async () => {
    const wrapper = mount(AppSelect, {
      propsData: {
        label: labelValue,
        options: ["1", "2"],
      },
    });

    const options = wrapper.find("select").findAll("option");

    options.at(0).setSelected(); // "1"
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["1"]);

    options.at(1).setSelected(); // "2"
    expect(wrapper.emitted("update:modelValue")[1]).toEqual(["2"]);
  });

  it("does not have error class when error prop is false", () => {
    const wrapper = mount(AppSelect, {
      propsData: {
        label: labelValue,
        options: ["foo"],
        error: false,
      },
    });
    const select = wrapper.find("select");
    expect(select.element.className).not.toContain("inputError");
  });
});
