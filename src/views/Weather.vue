<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Dados Meteorológicos
      </h1>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Última atualização: {{ lastUpdate }}
      </div>
    </div>

    <!-- Weather Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Sun class="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Nível de Luz
              </h3>
              <div class="mt-1 flex items-baseline">
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ weatherData.light }}
                </p>
                <p class="ml-2 text-sm text-gray-500 dark:text-gray-400">lx</p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Intensidade
              </div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ getLightIntensity(weatherData.light) }}
              </div>
            </div>
            <div class="mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                class="bg-yellow-500 h-2 rounded-full"
                :style="{ width: `${(weatherData.light / 100000) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CloudRain class="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Precipitação
              </h3>
              <div class="mt-1 flex items-baseline">
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ weatherData.rain }}
                </p>
                <p class="ml-2 text-sm text-gray-500 dark:text-gray-400">mm</p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500 dark:text-gray-400">Volume</div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ getRainIntensity(weatherData.rain) }}
              </div>
            </div>
            <div class="mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full"
                :style="{ width: `${(weatherData.rain / 10) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Droplets class="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Umidade do Ar
              </h3>
              <div class="mt-1 flex items-baseline">
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ weatherData.humidity }}
                </p>
                <p class="ml-2 text-sm text-gray-500 dark:text-gray-400">%</p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500 dark:text-gray-400">Nível</div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ getHumidityLevel(weatherData.humidity) }}
              </div>
            </div>
            <div class="mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full"
                :style="{ width: `${weatherData.humidity}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weather Forecast -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Previsão para os Próximos Dias
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div
            v-for="(forecast, index) in weatherForecast"
            :key="index"
            class="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
          >
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ forecast.day }}
            </div>
            <component
              :is="forecast.icon"
              class="h-8 w-8 my-2"
              :class="forecast.iconColor"
            />
            <div class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ forecast.temp }}°C
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ forecast.rain }}mm
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Sun,
  CloudRain,
  Droplets,
  Cloud,
  CloudSun,
  CloudLightning,
} from "lucide-vue-next";

const weatherData = {
  light: 23000,
  rain: 2.5,
  humidity: 78,
};

const lastUpdate = ref("Há 5 minutos");

const weatherForecast = [
  {
    day: "Hoje",
    temp: 25,
    rain: 2.5,
    icon: Sun,
    iconColor: "text-yellow-500 dark:text-yellow-400",
  },
  {
    day: "Amanhã",
    temp: 23,
    rain: 5.0,
    icon: CloudSun,
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    day: "Quarta",
    temp: 22,
    rain: 8.2,
    icon: CloudRain,
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    day: "Quinta",
    temp: 21,
    rain: 12.0,
    icon: CloudLightning,
    iconColor: "text-purple-500 dark:text-purple-400",
  },
  {
    day: "Sexta",
    temp: 24,
    rain: 1.0,
    icon: Cloud,
    iconColor: "text-gray-500 dark:text-gray-400",
  },
];

const getLightIntensity = (value: number): string => {
  if (value < 1000) return "Baixa";
  if (value < 20000) return "Moderada";
  return "Alta";
};

const getRainIntensity = (value: number): string => {
  if (value < 2.5) return "Fraca";
  if (value < 7.5) return "Moderada";
  return "Forte";
};

const getHumidityLevel = (value: number): string => {
  if (value < 30) return "Baixa";
  if (value < 70) return "Ideal";
  return "Alta";
};
</script>
