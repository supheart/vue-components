<template>
    <div class="show">
        <div class="menu-wrap">
            <div class="menu-hide" @click="toggleMenu"><i class="iconfont icon-category"></i></div>
            <menubar ref="menubar" :menus="menus" :rightMenu="menus[1].children" :isMini="isMini"></menubar>
        </div>
        <div class="content-wrap">
            <p v-for="t in 10">aaaaaa</p>
            <p >bbbb</p>
        </div>
    </div>
</template>

<script>
import Menubar from '@/base/menubar/menubar';
export default {
     data() {
        return {
            isMini: false
        };
    },
    created() {
        this.menus = [
            {id:'a', text:'主页1主页1', label:'33', labelColor:'red', url:'#', icon: 'icon-all'},
            {id:'b',text:'菜单菜单',icon:'icon-comments',url:'#',children:[
                {id:'b1',text:'菜单1',click:'test3',icon:'icon-all',url:'#', children: [
                    {id:'bbbb1',text:'配置配置',icon:'icon-pic',click:'test3'},
                    {id:'bbbb2',text:'退出',icon:'icon-pic',vlink:'/workdesk',url:'#'}
                ]},
                {id:'b2',text:'菜单2',click:'test3',icon:'icon-cart',url:'#'}
            ]},
            {id:'bb1',text:'编辑',tab:'a',icon:'icon-form',vlink:'#'},
            {id:'bb2',text:'文件',tab:'b',icon:'icon-edit',click:'test1'},
            {id:'bb3',text:'帮助',tab:'c',icon:'icon-email',click:'test2'},
            {id:'bb4',text:'工具',icon:'icon-moreunfold',url:'www.baidu.com'},
            {id:'c',text:'设置',icon:'icon-information',enabled:true,color:'blue',url:'#',right:true,label:'',children:[
                {id:'bbb',text:'配置',icon:'icon-pic',click:'test3'},
                {id:'adsd',text:'退出',icon:'home',vlink:'/workdesk',url:'#'}
            ]}
        ];
    },
    methods: {
        toggleMenu() {
            this.isMini = !this.isMini;
        }
    },
    components: {
        Menubar
    }
};
</script>
<style  lang="scss" scoped>
@import "./show";
</style>
