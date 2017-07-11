<template>
    <div class="menubar">
        <div class="menu-left" ref="menubar" :class="{mini: isMiniShow}">
            <div v-for="(menu, index) in menus" class="menu-item">
                <a v-if="!menu.children || menu.children.length === 0" class="menu-link" :class="{active: currentMenu.id === menu.id}" @click="menuClick(menu)">
                    <i class="iconfont" :class="menu.icon" v-if="menu.icon"></i>
                    <span v-show="!isMiniShow" class="text">{{menu.text}}</span>
                    <div class="tip" v-if="menu.label && !isMiniShow">{{menu.label}}</div>
                </a>
                <div v-else="menu.children.length > 0" class="menu-drop">
                    <div class="menu-text" @click="toggleExpand(menu, index)">
                        <i :class="{rotate: currentExpand === menu.id && isShow}" class="iconfont icon-moreunfold icon-tip"></i>
                        <i class="iconfont" :class="menu.icon" v-if="menu.icon"></i>
                        <span v-show="!isMiniShow" class="text">{{menu.text}}</span>
                    </div>
                    <menubar ref="subMenubar"
                        @expandSubItem="responseSubItemExpand"
                        @itemClick="respItemClick"
                        :level="level+1"
                        :is-mini="isMiniShow"
                        :parent="menu.id"
                        :menus="menu.children"
                        :parent-click="isShow"
                        :parent-click-id="currentMenu.id"
                        :class="{expand: currentExpand === menu.id && isShow}"
                        class="down" ></menubar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 子菜单的高度,与css对应
const SUB_HEIGHT = 36;
// 初始背景颜色
const BG_COLOR = 0x42485B;
// 字体颜色
// const FONT_COLOR = 0xffffff;
// 点击样式
// const ACTIVE_COLOR = 0x0994AA;
// 选取样式
// const HOVER_COLOR = 0x2bb6cc;

export default {
    name: 'menubar',
    data() {
        return {
            currentExpand: '',  // 记录当前展开子菜单的父节点id
            isShow: false,      // 是否展开子菜单
            isMiniShow: false,  // 是否想做靠拢折叠成迷你菜单
            currentMenu: {}     // 记录当前点击的菜单
        };
    },
    props: {
        // 菜单数组
        menus: {
            type: Array,
            default: () => []
        },
        // 当前菜单的父节点id
        parent: {
            type: String,
            default: ''
        },
        // 是否向左折叠
        isMini: {
            type: Boolean,
            default: false
        },
        // 当前的菜单层数
        level :{
            type: Number,
            default: 0
        },
        // 当前父节点是否点击收缩
        parentClick: {
            type: Boolean,
            default: false
        },
        // 当前点击父节点的id
        parentClickId: {
            type: String,
            default: ''
        }
    },
    mounted() {
        // 按层数来设置菜单背景色（可扩展为固定配置的颜色）
        let bgColor = (parseInt(BG_COLOR) + 1118481 * 2 * this.level).toString('16');
        this.$refs.menubar.style.backgroundColor = `#${bgColor}`;
    },
    methods: {
        // mouseOver(e) {
        //     console.log(this.theme.level.hover);
        //     e.target.style.background = this.theme.hover;
        // },
        // mouseOut(e) {
        //     console.log(e);
        //     e.target.style.background = this.theme.level[this.level].bgColor;
        // },
        respItemClick(menu) {
            this.$emit('itemClick', menu);
        },
        // 展开收缩子菜单的方法
        toggleExpand(menu, index) {
            this.saveCurrentState(menu);
            this.isShow = !this.isShow;
            // 如果当前要展开的子菜单与当前以展开的子菜单不同，则展开状态还是展开
            if(this.currentExpand && menu.id !== this.currentExpand) {
                // 先收缩上一个展开的子菜单
                this.changeSubMenuState(this.currentExpand);
                this.isShow = true;
            }
            // 展开当前要展开的子菜单
            this.currentExpand = menu.id;
            this.changeSubMenuState(this.currentExpand, menu, this.isShow);
        },
        // 设置子菜单的展开与收缩的css操作
        changeSubMenuState(id, menu, isShow, hasHeight, ischild) {
            // 判断是否有子菜单可以展开
            if(!this.$refs.subMenubar) {
                return;
            }
            // 找到当前要操作的子菜单
            let subDom = this.$refs.subMenubar.find((item) => {
                return item.parent === id;
            });
            if(!subDom) {
                return;
            }
            // 设置展开高度
            let height = hasHeight || 0;
            // 如果是展开操作，计算展开高度，为0则收缩
            if(menu && menu.children && isShow) {
                height += menu.children.length * SUB_HEIGHT;
            }
            subDom.$el.style.height = `${height}px`;
            console.log('expand', this.level, this.isShow);
            // 如果是父控件通知当前控件，不用再通知父控件
            if(!ischild) {
                // 通知父控制当前展开的高度，用于设置多级菜单的收缩
                this.$emit('expandSubItem', height);
            }
        },
        // 普通无子菜单项的点击操作
        menuClick(menu) {
            this.saveCurrentState(menu);
            // 点击普通菜单要取消收缩
            this.isShow = false;
            // 收缩上一个子菜单
            this.changeSubMenuState(this.currentExpand);
            this.$emit('itemClick', this.currentMenu);
        },
        // 存储当前点击菜单
        saveCurrentState(menu) {
            this.currentMenu = menu;
        },
        // 接受子菜单的响应，重新计算展开的高度
        responseSubItemExpand(height) {
            this.changeSubMenuState(this.currentExpand, this.currentMenu, true, height);
        }
    },
    watch: {
        // 监听是否需要折叠成迷你菜单
        isMini(newVal) {
            if(newVal) {
                this.$refs.menubar.style.width = '70px';
            }else {
                this.$refs.menubar.style.width = '200px';
            }
            this.isMiniShow = newVal;
        },
        // 监听父节点是否点击收缩
        parentClick(newVal) {
            // 如果点击了，并且当前的状态是展开，那就进行收缩
            if(!newVal && this.isShow) {
                this.isShow = false;
                this.changeSubMenuState(this.currentExpand, null, null, null, true);
            }
        },
        // 如果点解的父节点不是当前菜单的父节点，就取消选中显示
        parentClickId() {
            this.currentMenu = {};
        }
    }
};
</script>
<style  lang="scss" scoped>
@import "~@/common/scss/variable";
@import "~@/common/scss/mixin";
@import "./menubar";
</style>
