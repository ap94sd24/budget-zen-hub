import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUpView.vue';
import LoginView from '../views/LoginView.vue';
import FeedView from '../views/FeedView.vue';
import SearchView from '@/views/SearchView.vue';
import ProfileView from '@/views/ProfileView.vue';
import FollowersView from '@/views/FollowersView.vue';
import PostDetailView from '@/views/PostDetailView.vue';
import ChatView from '@/views/ChatView.vue';
import TrendView from '@/views/TrendView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:id',
      name: 'postdetailview',
      component: PostDetailView,
    },
    {
      path: '/trends/:id',
      name: 'trendview',
      component: TrendView,
    },
    {
      path: '/feed',
      name: 'feed',
      component: FeedView,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/profile/:id/followers',
      name: 'followers',
      component: FollowersView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },

    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
