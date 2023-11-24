import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menuData: [
        {
          id: '/test',
          text: '测试功能',
          link: '/test',
        },
        {
          id: 'map',
          text: '地图',
          link: null,
          children: [
            {
              id: 'mars3d',
              text: 'mars3d',
              link: '/map/mars3d',
            },
            {
              id: 'mapbox',
              text: 'mapbox',
              link: '/map/mapbox',
            },
            {
              id: 'cesium',
              text: 'cesium',
              link: '/map/cesium',
            },
          ],
        },
        {
          id: 'common',
          text: '通用组件',
          link: null,
          children: [
            {
              id: 'water-fall',
              text: '瀑布流',
              link: '/common/water-fall',
            },
            {
              id: 'virtualized-table',
              text: '虚拟化表格',
              link: '/common/virtualized-table',
            },
            {
              id: 'scroll-number',
              text: '滚动数字',
              link: '/common/scroll-number',
            },
            {
              id: 'image-cropper',
              text: '图片裁剪',
              link: '/common/image-cropper',
            },
          ],
        },
        {
          id: 'online-car',
          text: '网约车',
          link: null,
          children: [
            {
              id: '/online-car/statistics',
              text: '网约车数据',
              link: '/online-car/statistics',
            },
            {
              id: '/online-car/target',
              text: '指标统计',
              link: '/online-car/target',
            },
            {
              id: '/online-car/company',
              text: '企业统计',
              link: '/online-car/company',
            },
          ],
        },
        {
          id: 'note',
          text: '前端笔记',
          link: 'http://1.12.234.248/doc/',
          newPage: true,
        },
      ],
    };
  },
});
