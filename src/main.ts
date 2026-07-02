import './index.css';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { MotionPlugin } from '@vueuse/motion'
import { vReveal } from './directives/reveal';
import { vMagnetic } from './directives/magnetic';

createApp(App)
    .use(router)
    .use(MotionPlugin)
    .directive('reveal', vReveal)
    .directive('magnetic', vMagnetic)
    .mount('#app')
