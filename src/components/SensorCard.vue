<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
  >
    <div class="p-5">
      <!-- Header with icon and title -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <div :class="`p-2 rounded-lg mr-3 ${statusColors[status].bgLight}`">
            <component
              :is="iconComponent"
              :class="`h-5 w-5 ${statusColors[status].text}`"
            />
          </div>
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300">
            {{ title }}
          </h3>
        </div>
        <div
          :class="`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status].bg} ${statusColors[status].text}`"
        >
          {{ statusLabels[status] }}
        </div>
      </div>

      <!-- Value display -->
      <div class="flex items-baseline">
        <div class="text-3xl font-light text-gray-800 dark:text-white">
          {{ formattedValue }}
        </div>
        <div class="ml-1 text-sm text-gray-500 dark:text-gray-400">
          {{ unit }}
        </div>
      </div>

      <!-- Trend indicator -->
      <div class="mt-2 flex items-center">
        <component
          :is="trendIcon"
          class="h-4 w-4 mr-1"
          :class="
            trend > 0
              ? 'text-emerald-500'
              : trend < 0
              ? 'text-rose-500'
              : 'text-gray-400'
          "
        />
        <span
          class="text-xs"
          :class="
            trend > 0
              ? 'text-emerald-500'
              : trend < 0
              ? 'text-rose-500'
              : 'text-gray-400'
          "
        >
          {{ Math.abs(trend).toFixed(1) }}% nas últimas 24h
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Activity as ActivityIcon,
  Thermometer as ThermometerIcon,
  Droplets as DropletsIcon,
  Wind as WindIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-vue-next";

interface Props {
  title: string;
  value: number;
  unit: string;
  icon: "activity" | "thermometer" | "droplets" | "wind";
  status: "good" | "warning" | "critical";
  trend: number;
}

const props = defineProps<Props>();

// Format the value to have at most 1 decimal place
const formattedValue = computed(() => {
  return props.value.toFixed(1);
});

// Map icon names to components
const iconComponent = computed(() => {
  const iconMap = {
    activity: ActivityIcon,
    thermometer: ThermometerIcon,
    droplets: DropletsIcon,
    wind: WindIcon,
  };
  return iconMap[props.icon];
});

const trendIcon = computed(() => {
  if (props.trend > 0) return ArrowUpIcon;
  if (props.trend < 0) return ArrowDownIcon;
  return ArrowRightIcon;
});

// Status colors
const statusColors = {
  good: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    bgLight: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
  },
  critical: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    bgLight: "bg-rose-50 dark:bg-rose-900/20",
    text: "text-rose-600 dark:text-rose-400",
  },
};

// Status labels
const statusLabels = {
  good: "Normal",
  warning: "Atenção",
  critical: "Crítico",
};
</script>
