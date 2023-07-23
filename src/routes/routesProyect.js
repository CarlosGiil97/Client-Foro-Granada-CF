import { Home } from '../pages/home';
import { Profile } from '../pages/profile';
import { NewPost } from '../pages/newPost';
import { Categories } from '../pages/listPostCategories';
import { EditPost } from '../pages/editPost';
import { PostReplys } from '../pages/postReplys';

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
    },
    {
        path: '/post/:categoryId',
        exact: true,
        component: NewPost,
    },
    {
        path: '/post',
        exact: true,
        component: NewPost,
    },
    {
        path: '/categories/:categoryId',
        exact: true,
        component: Categories,
    },
    {

        path: '/editPost/:postId',
        exact: true,
        component: EditPost,

    },
    {

        path: '/postReplys/:postId',
        exact: true,
        component: PostReplys,

    }

];