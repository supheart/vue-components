import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import Show from '@/components/show/show';
import Test from '@/components/test/test';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/index', name: 'Index', component: Index},
    {path: '/show', name: 'Show', component: Show},
    {path: '/test', name: 'Test', component: Test}
  ]
});
