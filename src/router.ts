import { createRouter, createWebHistory } from 'vue-router';
import { routerLinkName as chaiRouterName } from './pages/chai/info';
import { routerLinkName as profileRouterName } from './pages/profile/info';
import { routerLinkName as docuflowRouterName } from './pages/docuflow/info';
import { routerLinkName as furyRouterName } from './pages/fury/info';
import { routerLinkName as cntRouterName } from './pages/cnt/info';
import { routerLinkName as baroRsRouterName } from './pages/baro-rs/info';
import { routerLinkName as kewRouterName } from './pages/kew/info';
import { routerLinkName as rootlineRouterName } from './pages/rootline/info';
import { routerLinkName as sliceGuardRouterName } from './pages/slice-guard/info';
import { routerLinkName as regVizRouterName } from './pages/regviz/info';
import { routerLinkName as ppRouterName } from './pages/pickle-pockets/info';

const routes = [
    // The main page of the app. Shows my profile.
    { path: "/", name: profileRouterName, component: () => import('@/pages/profile/Profile.vue') },
    // NOTE: Maybe make these dynamic in the future?
    { path: "/p/chai", name: chaiRouterName, component: () => import('@/pages/chai/Chai.vue'), meta: { fullBleed: true } },
    { path: "/p/docuflow", name: docuflowRouterName, component: () => import('@/pages/docuflow/Docuflow.vue'), meta: { fullBleed: true } },
    { path: '/p/fury', name: furyRouterName, component: () => import('@/pages/fury/Fury.vue'), meta: { fullBleed: true } },
    { path: '/p/cnt-study-hub', name: cntRouterName, component: () => import('@/pages/cnt/CNT.vue'), meta: { fullBleed: true } },
    { path: '/p/baro-rs', name: baroRsRouterName, component: () => import('@/pages/baro-rs/BaroRs.vue'), meta: { projectName: baroRsRouterName, fullBleed: true } },
    { path: '/p/baro-rs/drivers/:driverId', name: 'baro-rs-driver', component: () => import('@/pages/baro-rs/BaroRs.vue'), props: true, meta: { projectName: baroRsRouterName, fullBleed: true } },
    { path: '/p/kew', name: kewRouterName, component: () => import('@/pages/kew/Kew.vue'), meta: { fullBleed: true } },
    { path: '/p/rootline', name: rootlineRouterName, component: () => import('@/pages/rootline/Rootline.vue'), meta: { fullBleed: true } },
    { path: '/p/slice-guard', name: sliceGuardRouterName, component: () => import('@/pages/slice-guard/SliceGuard.vue'), meta: { fullBleed: true } },
    { path: '/p/regviz', name: regVizRouterName, component: () => import('@/pages/regviz/RegViz.vue'), meta: { fullBleed: true } },
    { path: '/p/pickle-pockets', name: ppRouterName, component: () => import('@/pages/pickle-pockets/PicklePockets.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFound.vue') },
]

export const router = createRouter({
    history: createWebHistory(''),
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
