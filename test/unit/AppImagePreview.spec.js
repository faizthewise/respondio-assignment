import { mount } from "@vue/test-utils";
import AppImagePreview from "@/components/base/AppImagePreview.vue"; // Replace this with the correct path to your component

describe("AppImagePreview", () => {
  it("renders properly", () => {
    const wrapper = mount(AppImagePreview);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders image with correct src and alt attributes", () => {
    const props = {
      src: "https://example.com/image.jpg",
      alt: "Example Image",
    };
    const wrapper = mount(AppImagePreview, { props });

    const imgElement = wrapper.find("img");
    expect(imgElement.exists()).toBe(true);

    expect(imgElement.attributes("src")).toBe(props.src);
    expect(imgElement.attributes("alt")).toBe(props.alt);
  });
});
