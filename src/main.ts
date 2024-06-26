import './index.css';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import Tres from '@tresjs/core';

createApp(App)
    .use(router)
    .use(Tres)
    .mount('#app')
