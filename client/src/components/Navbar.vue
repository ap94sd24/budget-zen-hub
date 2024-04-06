<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useUserStore } from '@/stores/user.store';
  import { storeToRefs } from 'pinia';

  const userStore = useUserStore();

  const { user } = storeToRefs(userStore);

  const showMenu = ref(false);

  const toggleMenu = () => {
    showMenu.value = !showMenu.value;
  };
</script>
<template>
  <nav class="py-5 px-8 border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <a href="#" class="text-xl">BudgetZenHub</a>
        </div>

        <div class="menu-center flex items-center md:space-x-12">
          <template v-if="user.isAuthenticated">
            <RouterLink to="/feed" class="text-blue-700 dark:text-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </RouterLink>
          </template>

          <!-- Add the rest of the links here with similar styling -->

          <!-- For small screens, display the toggle button to show/hide the menu -->
          <div class="md:hidden">
            <!-- Use JavaScript to toggle the menu -->
            <button
              @click="toggleMenu"
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="menu-right hidden md:flex items-center space-x-4">
          <!-- Display user avatar or login/signup buttons -->
          <template v-if="user.isAuthenticated">
            <RouterLink :to="{ name: 'profile', params: { id: user.id } }">
              <img :src="user.avatar" class="w-12 rounded-full" />
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/login" class="py-2 px-4 bg-gray-600 text-white rounded-lg"
              >Login</RouterLink
            >
            <RouterLink to="/signup" class="py-2 px-4 bg-blue-600 text-white rounded-lg"
              >Sign Up</RouterLink
            >
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile menu (shown only on small screens) -->
    <div v-if="showMenu" class="md:hidden mt-4">
      <!-- Add the links here -->
      <!-- Example link -->
      <RouterLink to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >Profile</RouterLink
      >
    </div>
  </nav>
</template>
