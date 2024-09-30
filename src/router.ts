import { createRouter, createWebHistory } from 'vue-router';
import { routerLinkName as chaiRouterName } from './pages/chai/info';
import { routerLinkName as profileRouterName } from './pages/profile/info';
import { routerLinkName as docuflowRouterName } from './pages/docuflow/info';
import { routerLinkName as furyRouterName } from './pages/fury/info';

const routes = [
    // The main page of the app. Shows my profile.
    { path: "/", name: profileRouterName, component: () => import('@/pages/profile/Profile.vue') },
    // NOTE: Maybe make these dynamic in the future?
    { path: "/p/chai", name: chaiRouterName, component: () => import('@/pages/chai/Chai.vue') },
    { path: "/p/docuflow", name: docuflowRouterName, component: () => import('@/pages/docuflow/Docuflow.vue') },
    { path: '/p/fury', name: furyRouterName, component: () => import('@/pages/fury/Fury.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFound.vue') },
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
