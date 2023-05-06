import { createRouter, createWebHashHistory } from 'vue-router';

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
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: routeConfig,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export const setupRouter = (app: any) => {
  // 做路由loading 处理 并挂载vue-router
  router.beforeEach((to, from, next) => {
    next();
  });

  app.use(router);
};
export default router;
