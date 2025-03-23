<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Sensores
      </h1>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle class="h-4 w-4 mr-2" />
        Adicionar Sensor
      </button>
    </div>

    <!-- Status Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <CheckCircle class="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Ativos
            </h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ activeSensors }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <XCircle class="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Inativos
            </h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ inactiveSensors }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Gauge class="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Total
            </h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ sensorList.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sensors Table -->
    <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <div class="p-4">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">
              Lista de Sensores
            </h2>
            <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Lista completa de todos os sensores instalados no sistema.
            </p>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Localização
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Última Leitura
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr
              v-for="sensor in sensorList"
              :key="sensor.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
              >
                {{ sensor.id }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
              >
                {{ sensor.name }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
              >
                {{ sensor.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="[
                    sensor.status === 'ativo'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
                  ]"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full mr-1.5"
                    :class="[
                      sensor.status === 'ativo'
                        ? 'bg-green-400 dark:bg-green-400'
                        : 'bg-red-400 dark:bg-red-400',
                    ]"
                  ></span>
                  {{ sensor.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
              >
                {{ sensor.lastReading || "N/A" }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Settings class="h-4 w-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  PlusCircle,
  CheckCircle,
  XCircle,
  Settings,
  Gauge,
} from "lucide-vue-next";

interface SensorItem {
  id: number;
  name: string;
  location: string;
  status: string;
  lastReading?: string;
}

// Dados simulados
const sensorList: SensorItem[] = [
  {
    id: 1,
    name: "Sensor de pH",
    location: "Tanque 1",
    status: "ativo",
    lastReading: "Há 5 minutos",
  },
  {
    id: 2,
    name: "Sensor de O2",
    location: "Tanque 2",
    status: "ativo",
    lastReading: "Há 2 minutos",
  },
  {
    id: 3,
    name: "Sensor de Turbidez",
    location: "Tanque 3",
    status: "inativo",
    lastReading: "Há 2 horas",
  },
  {
    id: 4,
    name: "Sensor de Temperatura",
    location: "Tanque 2",
    status: "ativo",
    lastReading: "Há 1 minuto",
  },
];

const activeSensors = computed(
  () => sensorList.filter((sensor) => sensor.status === "ativo").length
);

const inactiveSensors = computed(
  () => sensorList.filter((sensor) => sensor.status === "inativo").length
);
</script>
