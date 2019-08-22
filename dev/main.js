/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import Inkline from '../src';

Vue.use(Inkline);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: h => h(App),
});
