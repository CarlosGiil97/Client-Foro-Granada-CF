import { Home } from '../pages/home';
import { Profile } from '../pages/profile';

export const routesProyect = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/home',
        exact: true,
        component: Home,
    },
    {
        path: '/profile',
        exact: true,
        component: Profile,
    }
];