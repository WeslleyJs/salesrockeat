import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Err from './pages/Err'

const routes = [{
        path:'/',
        name: 'home',
        component: Home
    },
    {
        path:'/:catchAll(.*)',
        name: 'error',
        // redirect: 'error',
        component: Err,
    },
    {
        path:'/dashboard',
        name: 'dashboard',
        component: Dashboard
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes:routes
});

export default router;
