import { createApp } from 'vue';

import App from './App.vue';
import DataSet from './components/DataSet.vue';

import router from './router'

const app = createApp(App).use(router);
app.component('data-set', DataSet);



app.mount('#app');
