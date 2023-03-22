
import VuePlugin from 'custom-editor/src/vue';
import importC from 'custom-editor';
let requireC = require('custom-editor');
let requireV = require('custom-editor/vue');
import {createApp} from 'vue';
import App from './App.vue';
import './style/base.css';
const app = createApp(App);
app.mount('#app')
console.log(VuePlugin);
console.log('requireV', requireV);
console.log('requireC', requireC);
console.log('importC', importC);
app.use(VuePlugin, {name: 'vue-custom-editor'});
