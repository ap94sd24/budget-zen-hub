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
import EditProfileView from '@/views/EditProfileView.vue';
import EditPasswordView from '@/views/EditPasswordView.vue';
import NotificationsView from '@/views/NotificationsView.vue';
import auth from '@/utils/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/post/:id',
      name: 'postdetailview',
      component: PostDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/trends/:id',
      name: 'trendview',
      component: TrendView,
      meta: { requiresAuth: true },
    },
    {
      path: '/feed',
      name: 'feed',
      component: FeedView,
      meta: { requiresAuth: true },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: NotificationsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit',
      name: 'editprofile',
      component: EditProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit/password',
      name: 'editpassword',
      component: EditPasswordView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/:id/followers',
      name: 'followers',
      component: FollowersView,
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { requiresAuth: true },
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
    { path: '/:pathMatch(.*)*', redirect: '/feed' },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
