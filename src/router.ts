import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    // The main page of the app. Shows my profile.
    { path: "/", name: 'profile', component: () => import('@/pages/profile/Profile.vue') },
]

export const router = createRouter({
    history: createWebHistory('Personal-Website'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
});

router.beforeEach((to, from, next) => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }

    next();
});
