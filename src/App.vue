<template>
  <div id="app">
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from '@/components/tab/tab';
export default {
  name: 'app',
  components: {
    Tab
  }
};
</script>

<style style="sass" scoped>
 #app{
 }
</style>
