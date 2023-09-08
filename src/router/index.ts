import { createRouter, createWebHashHistory } from 'vue-router';
import type { NProgressOptions } from 'nprogress';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routeConfig = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: 'login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/test',
        name: '测试',
        component: () => import('@/views/test/index.vue'),
        meta: {
          title: '测试'
        }
      },
      {
        path: '/iframe',
        component: () => import('@/views/iframe/index.vue'),
        query: {
          url: ''
        },
      },
      {
        path: '/map/cesium',
        name: 'mapbox',
        component: () => import('@/views/map/cesium/index.vue'),
        meta: {
          title: 'cesium地图',
        }
      },
      {
        path: '/map/mapbox',
        name: 'mapbox',
        component: () => import('@/views/map/mapbox/index.vue'),
        meta: {
          title: 'mapbox地图',
        }
      },
      {
        path: '/map/mars3d',
        name: 'mars3d',
        component: () => import('@/views/map/mars3d/index.vue'),
        meta: {
          title: 'mars3d地图',
        }
      },
      {
        path: '/test-css',
        name: 'test-css',
        component: () => import('@/views/test-css/index.vue'),
        meta: {
          title: '练习css',
        }
      },
      {
        path: '/online-car/statistics',
        name: 'online-car-statistics',
        component: () => import('@/views/online-car/statistics/index.vue'),
        meta: {
          title: '网约车数据',
        }
      },
      {
        path: '/online-car/company',
        name: 'online-car-company',
        component: () => import('@/views/online-car/company/index.vue'),
        meta: {
          title: '网约车企业',
        }
      },
      {
        path: '/online-car/target',
        name: 'online-car-target',
        component: () => import('@/views/online-car/target/index.vue'),
        meta: {
          title: '网约车指标',
        }
      },
      {
        path: '/common/water-fall',
        name: 'common-water-fall',
        component: () => import('@/views/common/water-fall/index.vue'),
        meta: {
          title: '瀑布流',
        }
      },
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: routeConfig,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

NProgress.configure({ showSpinner: false } as NProgressOptions);

export const setupRouter = (app: any) => {
  // 做路由loading 处理 并挂载vue-router
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach((to) => {
    NProgress.done();
  });

  app.use(router);
};
export default router;
