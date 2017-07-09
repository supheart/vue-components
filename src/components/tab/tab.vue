<template>
    <div class="tab">
        <router-link class="tab-item" v-for="item in data" :key="item.key" tag="div" :to="item.to">
            <span class="tab-link">{{item.text}}</span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return [
                    {text: '首页', to: '/index'},
                    {text: '展示', to: '/show'},
                    {text: '测试', to: '/test'}
                ];
            }
        }
    }
};
</script>
<style  lang="scss" scoped>
@import "~@/common/scss/variable";
@import "~@/common/scss/mixin";
@import "./tab";
</style>
