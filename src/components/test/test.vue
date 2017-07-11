<template>
    <div class="test">
        <div class="menu-wrap">
            <div class="menu-hide" @click="toggleMenu"><i class="iconfont icon-category"></i></div>
            <menubar ref="menubar" :menus="menus" :theme="theme" :rightMenu="menus[1].children" :isMini="isMini" @itemClick="menuClick"></menubar>
        </div>
        <div class="content-wrap">
            <p v-for="t in 100">aaaaaa</p>
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
            {id:'a',text:'主页1主页1',tips:'提示',label:'33',labelColor:'red',url:'#', icon: 'icon-all'},
            {id:'b',text:'菜单菜单',icon:'icon-comments',tips:'提示',url:'#',children:[
                {id:'b1',text:'菜单1',click:'test3',icon:'icon-all',url:'#', children: [
                    {id:'bbbb1',text:'配置配置',icon:'icon-pic',tips:'提示',click:'test3'},
                    {id:'bbbb2',text:'退出',icon:'icon-pic',tips:'提示',vlink:'/workdesk',url:'#', children: [
                        {id:'cbbbb1',text:'配置配置',icon:'icon-pic',tips:'提示',click:'test3'},
                        {id:'cbbbb2',text:'退出',icon:'icon-pic',tips:'提示',vlink:'/workdesk',url:'#', children: []}
                    ]}
                ]},
                {id:'b2',text:'菜单2',click:'test3',icon:'icon-cart',url:'#'}
            ]},
            {id:'bb1',text:'编辑',tab:'a',icon:'icon-form',vlink:'#'},
            {id:'bb2',text:'文件',tab:'b',icon:'icon-edit',click:'test1'},
            {id:'bb3',text:'帮助',tab:'c',icon:'icon-email',click:'test2'},
            {id:'bb4',text:'工具',icon:'icon-moreunfold',url:'www.baidu.com'},
            {id:'c',text:'设置',icon:'icon-information',tips:'提示',enabled:true,color:'blue',url:'#',right:true,label:'',children:[
                {id:'bbb',text:'配置',icon:'icon-pic',tips:'提示',click:'test3'},
                {id:'adsd',text:'退出',icon:'home',tips:'提示',vlink:'/workdesk',url:'#'}
            ]},
            {id:'abb1',text:'编辑',tab:'a',icon:'icon-form',vlink:'#'},
            {id:'abb2',text:'文件',tab:'b',icon:'icon-edit',click:'test1'},
            {id:'abb3',text:'帮助',tab:'c',icon:'icon-email',click:'test2'},
            {id:'abb4',text:'工具',icon:'icon-moreunfold',url:'www.baidu.com'},
            {id:'ac',text:'设置',icon:'icon-information',tips:'提示',enabled:true,color:'blue',url:'#',right:true,label:'',children:[
                {id:'abbb',text:'配置',icon:'icon-pic',tips:'提示',click:'test3'},
                {id:'aadsd',text:'退出',icon:'home',tips:'提示',vlink:'/workdesk',url:'#'}
            ]}
        ];
        this.theme = {
            active: 'red',
            hover: 'yellow',
            width: '100px',
            bgColor: 'red',
            color: 'blue',
            level:[
                {bgColor: 'green', fontColor: '#ccc', height: '42px'},
                {bgColor: 'blue', fontColor: '#000', height: '36px'},
                {bgColor: 'yellow', fontColor: '#d9d9d9', height: '28px'}
            ]
        };
    },
    methods: {
        toggleMenu() {
            this.isMini = !this.isMini;
        },
        menuClick(menu) {
            console.log(menu.id, menu);
        }
    },
    components: {
        Menubar
    }
};
</script>
<style  lang="scss" scoped>
@import "./test";
</style>
