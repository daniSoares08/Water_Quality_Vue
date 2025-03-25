<template>
  <div
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
    :class="isDarkMode ? 'dark' : ''"
  >
    <!-- Navbar -->
    <header
      class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <Droplets class="h-8 w-8 text-blue-500" />
            <span
              class="ml-2 text-xl font-semibold text-gray-900 dark:text-white"
              >Qualidade da Água</span
            >
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[
                $route.path === item.path
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
              ]"
            >
              <component :is="item.icon" class="h-5 w-5 mr-1.5" />
              {{ item.name }}
            </router-link>
          </nav>

          <!-- Right side controls -->
          <div class="flex items-center space-x-4">
            <!-- Dark mode toggle -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Sun v-if="isDarkMode" class="h-5 w-5" />
              <Moon v-else class="h-5 w-5" />
            </button>

            <!-- Mobile menu button -->
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" />
              <X v-else class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile navigation -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 dark:border-gray-700"
      >
        <div class="px-2 py-3 space-y-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-3 py-2 rounded-md text-base font-medium"
            :class="[
              $route.path === item.path
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                : 'text-gray-600 dark:text-gray-300',
            ]"
            @click="isMobileMenuOpen = false"
          >
            <component :is="item.icon" class="h-5 w-5 mr-2" />
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            &copy; {{ new Date().getFullYear() }} PUCPR Todos os direitos reservados
          </p>
          <div class="flex space-x-6">
            <a
              href="#"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Github class="h-5 w-5" />
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Mail class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  LayoutDashboard,
  Gauge,
  Cloud,
  Sun,
  Moon,
  Menu,
  X,
  Github,
  Mail,
  Droplets,
} from "lucide-vue-next";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Sensores", path: "/sensors", icon: Gauge },
  { name: "Clima", path: "/weather", icon: Cloud },
];

const isMobileMenuOpen = ref(false);
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value ? "true" : "false");

  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Initialize dark mode from saved preference
const initDarkMode = () => {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else if (savedMode === null) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      isDarkMode.value = true;
      document.documentElement.classList.add("dark");
    }
  }
};

// Initialize on component mount
initDarkMode();
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

html {
  scroll-behavior: smooth;
}

body {
  @apply antialiased;
}

.router-link-active {
  @apply text-blue-600 dark:text-blue-400;
}
</style>
