import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { IMGLIST } from "./mock-data";

import WaterFall from "../index.vue";
import Card from "../card.vue";
import { log } from "console";

describe("water-fall.vue", () => {
  test("render test", async () => {
    expect(WaterFall).toBeTruthy();
    const wrapper = mount(WaterFall, {
      props: {
        hasMore: true,
        imgList: IMGLIST,
      },
      attachTo: document.body,
    });
    console.log(wrapper.find(`.content-item`), "wrapper");
    expect(wrapper.find(`.content-item`).exists()).toBe(true);
  });
});
