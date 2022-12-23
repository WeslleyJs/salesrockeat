import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home';
import User from './pages/User';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Err from './pages/Err'

const routes = [{
        path:'/',
        name: 'home',
        component: Home
    },
    {
        path:'/register',
        name: 'user',
        component: User
    },
    {
        path:'/login',
        name: 'login',
        component: Login
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