<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useUserStore } from '@/stores/user.store';
  import { storeToRefs } from 'pinia';

  const userStore = useUserStore();

  const { user } = storeToRefs(userStore);

  const showHiddenElement = ref(false);

  const toggleMenu = () => {
    showHiddenElement.value = !showHiddenElement.value;
  };
</script>
<template>
  <nav class="py-5 px-8 border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <RouterLink to="/feed">BudgetZenHub</RouterLink>
        </div>

        <div class="hidden md:flex items-center space-x-12 menu-center">
          <div v-if="user.isAuthenticated" class="menu-center flex space-x-12">
            <!-- Your existing menu items -->
          </div>
        </div>

        <div class="menu-right flex items-center">
          <template v-if="user.isAuthenticated">
            <RouterLink :to="{ name: 'profile', params: { id: user.id } }">
              <img :src="user.avatar" class="w-12 rounded-full" />
            </RouterLink>
          </template>
          <template v-else>
            <div class="md:flex hidden items-center space-x-4">
              <RouterLink to="/login" class="py-4 px-6 mr-4 bg-blue-600 text-white rounded-lg"
                >Login</RouterLink
              >
              <RouterLink to="/signup" class="py-4 px-6 bg-gray-600 text-white rounded-lg"
                >Sign Up</RouterLink
              >
            </div>
          </template>
          <!-- Hamburger icon -->
          <div class="md:hidden flex items-center">
            <!-- Show only on small screens -->
            <button
              @click="toggleMenu"
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <!-- Hamburger icon -->
              <template v-if="!showHiddenElement">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </template>
              <template v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </template>
            </button>
          </div>
        </div>
      </div>
      <template v-if="showHiddenElement">
        <div class="md:hidden flex items-center justify-center w-full mt-4">
          <RouterLink
            to="/login"
            class="py-4 px-6 mr-4 bg-blue-600 text-white w-80 rounded-lg text-center"
            >Login</RouterLink
          >
        </div>
        <div class="md:hidden flex items-center justify-center w-full mt-4">
          <RouterLink
            to="/signup"
            class="py-4 px-6 mr-4 bg-gray-600 text-white w-80 rounded-lg text-center"
            >Sign Up</RouterLink
          >
        </div>
      </template>
    </div>
  </nav>
</template>
