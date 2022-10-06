import { createRouter, createWebHistory } from "vue-router";
import store from './store/index'

import CoachDetail from './pages/coaches/CoachDetail';
import CoachesList from './pages/coaches/CoachesList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import ContactCoach from './pages/requests/ContactCoach';
import RequestsReceive from './pages/requests/RequestsReceive'
import NotFound from './pages/NotFound';
import UserAuth from './pages/auth/UserAuth'

const router = createRouter({   
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/coaches'
        },
        {
            path: '/coaches',
            component: CoachesList
        },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                {
                    path: 'contact', // /coaches/c1/contact
                    component: ContactCoach
                }
            ]
        },
        {
            path: '/register',
            component: CoachRegistration,
            meta: {
                requiresAuth: true,
                isCoach: true
            }
        },
        {
            path: '/requests',
            component: RequestsReceive,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/auth',
            component: UserAuth,
            meta: {
                requiresUnAuth: true
            }
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        },
    ]
})

router.beforeEach((to,_,next) => {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    }
    else if(to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/coaches')
    }
    // else if(to.meta.isCoach && to.meta.requiresAuth && store.getters['coaches/isCoach']) {
    //     next('/coaches')
    // }
    else {
        next();
    }
})

export default router;