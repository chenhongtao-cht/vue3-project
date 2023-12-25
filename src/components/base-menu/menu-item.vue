<template>
    <el-sub-menu :class="menuData.class" :index="menuData.id" :key="menuData.id"
        v-if="menuData.children && menuData.children.length > 0">
        <template #title>
            <span class="menu-title">
                {{ menuData.text }}
            </span>
            <slot :name="menuData.id"></slot>
        </template>
        <sub-menu v-for="menu in menuData.children" :key="menu.id" :menu-data="menu">
        </sub-menu>
    </el-sub-menu>
    <el-menu-item :class="menuData.class" :index="menuData.id" v-else>
        {{ menuData.text }}
        <slot :name="menuData.id"></slot>
    </el-menu-item>
</template>

<script>

export default {
    name: "SubMenu",
    props: {
        menuData: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    methods: {
        getTo(menu) {
            const submenu = this.getValidPath(menu, null, false);
            if (!submenu) {
                return '';
            }
            return submenu.path;
        },
        getValidPath(menu) {

            const _toValidPath = menu => {
                if (/(^https?:\/\/)|(\.\/)|(\.html)/.test(menu.link)) {
                    return {
                        path: '/iframe',
                        query: {
                            url: menu.link
                        }
                    }
                }
                return menu.link;
            }

            let {
                link,
                children
            } = menu;
            if (!link) {
                let firstValidMenu = this.getFirstValidSubMenu(menu);
                if (firstValidMenu === null) {
                    return null;
                }
                return {
                    menu: firstValidMenu,
                    path: _toValidPath(firstValidMenu)
                }
            }
            return {
                menu: menu,
                path: _toValidPath(menu)
            }
        },
        // 获取某个或者某组菜单下的第一个可访问的菜单
        getFirstValidSubMenu(menu) {
            if (menu.link) {
                return menu;
            }

            let foundMenu = null;
            let each = function (menuArr) {
                if (!menuArr || menuArr.length <= 0 || foundMenu) {
                    return;
                }
                for (let menu of menuArr) {
                    if (foundMenu) {
                        return;
                    }
                    if (menu.link) {
                        foundMenu = menu;
                        return;
                    }
                    each(menu.children);
                }
            }

            if (Array.isArray(menu)) {
                for (let menuItem of menu) {
                    if (menuItem.link) {
                        foundMenu = menuItem;
                        break;
                    }
                    each(menuItem.children);
                }
            } else {
                if (!menu.children ||
                    !menu.children.length) {
                    console.error(`菜单【${menu.text}】下没有找到可访问的路由`);
                }
                each(menu.children);
            }

            return foundMenu;
        },
    },
};
</script>
