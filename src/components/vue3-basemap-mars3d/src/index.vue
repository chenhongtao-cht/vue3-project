<template>
  <div ref="map" class="mars3d-basemap">
    <map-layers v-if="isMapReady" :slots="$slots"></map-layers>
    <slot name="common" />
  </div>
</template>

<script>
import { merge } from "lodash-es";
import defaultMapOption from "./map-option.js";
import { h, markRaw } from "vue";

const loadScript = (url) => {
  return new Promise((resolve) => {
    let scriptDom = document.createElement("script");
    scriptDom.src = url;
    scriptDom.onload = resolve;
    document.body.appendChild(scriptDom);
  });
};

const loadCss = (url) => {
  return new Promise((resolve) => {
    let linkDom = document.createElement("link");
    linkDom.href = url;
    linkDom.rel = "stylesheet";
    linkDom.onload = resolve;
    document.head.appendChild(linkDom);
  });
};
const loadScriptCore = (scriptSrc, scriptName) => {
  return new Promise((resolve) => {
    if (typeof window[scriptName] != "undefined") {
      resolve();
      return;
    }
    if (window[`__SUTPC_LOADING_${scriptName}__`] === true) {
      const checkScriptLoaded = () => {
        if (typeof window[scriptName] != "undefined") {
          resolve();
          return;
        }
        requestAnimationFrame(checkScriptLoaded);
      };
      checkScriptLoaded();
      return;
    }

    window[`__SUTPC_LOADING_${scriptName}__`] = true;
    loadScript(scriptSrc).then(resolve);
  });
};

export async function loadMars3d() {

  const makeUrl = url => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    return baseUrl + '/' + url.replace(/^\//, '');
  }

  await Promise.all([
    loadCss(makeUrl("static/mars3d-cesium/Build/Cesium/Widgets/widgets.css")),
    loadCss(makeUrl("static/mars3d/mars3d.css")),
  ]);
  await loadScriptCore(makeUrl("static/mars3d-cesium/Build/Cesium/Cesium.js"), "Cesium");
  await loadScriptCore(makeUrl("static/mars3d/mars3d.js"), "mars3d");
  await loadScriptCore(makeUrl("static/turf/6.5.0/turf.min.js"), "turf");
}

export default {
  components: {
    MapLayers: {
      provide: function () {
        return {
          mapObj: this.$parent.mapObj,
          baseMap: this.$parent,
        };
      },
      props: {
        slots: {
          type: [Array, Object],
          default: function () {
            return [];
          },
        },
      },
      render() {
        if (!this.slots.default && !this.$parent.commonLayer) {
          return [];
        }
        return h(
          "div",
          {
            class: "mars3d-map-layers",
            style: "display: none",
          },
          [
            this.slots.default(),
            this.$parent.showCommonLayer && h(this.$parent.commonLayer),
          ]
        );
      },
    },
  },
  props: {
    option: {
      type: Object,
      default: function () {
        return {};
      },
    },
    showContextMenu: {
      type: Boolean,
      default: true,
    },
    shadows: {
      type: Boolean,
      default: false,
    },
    heatmap: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mapObj: {},
      isMapReady: false,
    };
  },
  methods: {
    async init() {
      await loadMars3d();

      if (this.heatmap && typeof window["mars3d-heatmap"] === "undefined") {
        //热力图依赖
        await Promise.all([
          loadScript("static/mars3d/plugins/heatmap/heatmap.js"),
          loadScript("static/mars3d/plugins/heatmap/mars3d-heatmap.js"),
        ]);
      }

      const finalMapOption = merge(defaultMapOption, this.option);

      // baseMaps直接覆盖，否则数组会叠加，导致无法完全覆盖默认的basemaps
      if (this.option?.basemaps) {
        finalMapOption.basemaps = this.option.basemaps;
      }

      const map = new mars3d.Map(this.$refs.map, finalMapOption);

      // 生产环境下不显示右键菜单
      if (!this.showContextMenu) {
        map.unbindContextMenu();
      } else {
        const defaultContextmenuItems = map.getDefaultContextMenu(); // 内置的默认右键菜单获取方法
        map.bindContextMenu(defaultContextmenuItems); // 可以删减defaultContextmenuItems数组内值
      }

      // 倾斜视图 鼠标右键旋转
      map.viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG,
      ];
      // 缩放设置 重新设置缩放成员
      map.viewer.scene.screenSpaceCameraController.zoomEventTypes = [
        Cesium.CameraEventType.MIDDLE_DRAG,
        Cesium.CameraEventType.WHEEL,
        Cesium.CameraEventType.PINCH,
      ];
      // 平移 添加鼠标左键平移
      map.viewer.scene.screenSpaceCameraController.rotateEventTypes = [
        Cesium.CameraEventType.LEFT_DRAG,
      ];

      if (this.shadows) {
        // 开启投影
        map.viewer.scene.globe.enableLighting = true;
        map.viewer.shadows = true;
        // 阴影透明度--越大越透明
        map.viewer.shadowMap.darkness = 0.4;
      }

      this.mapObj.map = markRaw(map);
      this.mapObj.viewer = markRaw(map.viewer);
      this.$emit("map-ready", this.mapObj);

      this.isMapReady = true;
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.mapObj.map.destroy();
  },
};
</script>

<style lang="less" scoped>
.mars3d-basemap {
  width: 100%;
  height: 100%;
  :deep(.cesium-viewer-toolbar) {
    position: absolute;
    top: unset;
    bottom: 15px;
    right: 8px;
    width: 36px;
    .cesium-button {
      width: 30px;
      height: 30px;
      border: none;
      // border: 1px solid rgb(255 255 255 / 20%);
      background: rgba(33, 118, 149, 0.8);
      border-radius: 0;
      &:active,
      &:hover {
        color: #fff;
        fill: #fff;
        background: rgba(0, 203, 255, 0.8);
        box-shadow: unset;
      }
      & > div {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;

        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  :deep(.cesium-baseLayerPicker-sectionTitle) {
    display: none;
  }
  :deep(.cesium-baseLayerPicker-dropDown) {
    bottom: 0px;
    right: 40px;
  }
}
</style>
