import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
        menuData: [{
            id: '/test',
            text: '测试功能',
            link: '/test'
        },{
            id: '/test-css',
            text: '练习模板',
            link: '/test-css'
        },
        {
            id: 'online-car',
            text: '网约车',
            link: null,
            children: [{
                id: '/online-car/statistics',
                text: '网约车数据',
                link: '/online-car/statistics'
            },{
                id: '/online-car/target',
                text: '指标统计',
                link: '/online-car/target'
            },{
                id: '/online-car/company',
                text: '企业统计',
                link: '/online-car/company'
            },]
        },
            {
            id: 'note',
            text: '前端笔记',
            link: 'http://1.12.234.248/doc/',
            newPage: true
        }]
    };
  }
});