import './index.css';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { MotionPlugin } from '@vueuse/motion'

// Loading of the theme from local storage or system preference
document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

createApp(App)
    .use(router)
    .use(MotionPlugin)
    .mount('#app')
