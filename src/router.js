import { createRouter, createWebHistory } from "vue-router";
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
            component: CoachRegistration
        },
        {
            path: '/requests',
            component: RequestsReceive
        },
        {
            path: '/auth',
            component: UserAuth
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        },
    ]
})

export default router;