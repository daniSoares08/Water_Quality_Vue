<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-light text-gray-800 dark:text-white">
          Painel de Monitoramento
          <span class="block text-sm text-gray-500 dark:text-gray-400 mt-1">
            Monitoramento em tempo real dos parâmetros da água
          </span>
        </h1>
      </header>

      <!-- Sensor Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <SensorCard
          title="pH"
          :value="currentValues.ph"
          unit=""
          icon="activity"
          :status="getSensorStatus(currentValues.ph, 6.5, 7.5, 6, 8)"
          :trend="0.2"
        />

        <SensorCard
          title="Temperatura"
          :value="currentValues.temperature"
          unit="°C"
          icon="thermometer"
          :status="getSensorStatus(currentValues.temperature, 22, 28, 18, 30)"
          :trend="-0.5"
        />

        <SensorCard
          title="Turbidez"
          :value="currentValues.turbidity"
          unit="NTU"
          icon="droplets"
          :status="getSensorStatus(currentValues.turbidity, 0, 5, 0, 10)"
          :trend="0.8"
        />

        <SensorCard
          title="O₂ Dissolvido"
          :value="currentValues.oxygen"
          unit="mg/L"
          icon="wind"
          :status="getSensorStatus(currentValues.oxygen, 5, 7, 4, 8)"
          :trend="0.1"
        />
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Temperature History Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">
              Histórico de Temperatura
            </h2>
            <div class="flex space-x-2">
              <button
                class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                Hoje
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Semana
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Mês
              </button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="temperatureChartRef"></canvas>
          </div>
        </div>

        <!-- pH History Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">
              Histórico de pH
            </h2>
            <div class="flex space-x-2">
              <button
                class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                Hoje
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Semana
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Mês
              </button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="phChartRef"></canvas>
          </div>
        </div>

        <!-- Turbidity History Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">
              Histórico de Turbidez
            </h2>
            <div class="flex space-x-2">
              <button
                class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                Hoje
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Semana
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Mês
              </button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="turbidityChartRef"></canvas>
          </div>
        </div>

        <!-- Oxygen History Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">
              Histórico de O₂ Dissolvido
            </h2>
            <div class="flex space-x-2">
              <button
                class="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                Hoje
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Semana
              </button>
              <button
                class="text-xs px-2 py-1 rounded text-gray-500 dark:text-gray-400"
              >
                Mês
              </button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="oxygenChartRef"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import SensorCard from "../components/SensorCard.vue";
import Chart from "chart.js/auto";

type SensorData = {
  ph: number[];
  temperature: number[];
  turbidity: number[];
  oxygen: number[];
};

const sensorHistory = reactive<SensorData>({
  ph: [],
  temperature: [],
  turbidity: [],
  oxygen: [],
});

const currentValues = reactive({
  ph: 0,
  temperature: 0,
  turbidity: 0,
  oxygen: 0,
});

// Referências para os gráficos
const temperatureChartRef = ref<HTMLCanvasElement | null>(null);
const phChartRef = ref<HTMLCanvasElement | null>(null);
const turbidityChartRef = ref<HTMLCanvasElement | null>(null);
const oxygenChartRef = ref<HTMLCanvasElement | null>(null);

// Função para determinar o status do sensor
const getSensorStatus = (
  value: number,
  minGood: number,
  maxGood: number,
  minWarning: number,
  maxWarning: number
): "good" | "warning" | "critical" => {
  if (value >= minGood && value <= maxGood) return "good";
  if (value >= minWarning && value <= maxWarning) return "warning";
  return "critical";
};

const generateTimeLabels = (count: number) => {
  const labels: string[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(now.getHours() - i);
    labels.push(`${d.getHours()}:00`);
  }
  return labels;
};


// Configuração base do gráfico para evitar repetição
type ChartConfigParams = {
  labels: string[];
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

const createLineChart = (
  canvas: HTMLCanvasElement,
  { labels, label, data, borderColor, backgroundColor }: ChartConfigParams
) => {
  new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor,
          backgroundColor,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: { display: true, color: "rgba(0, 0, 0, 0.05)" },
        },
        x: {
          grid: { display: false },
        },
      },
    },
  });
};

onMounted(async () => {
  const res = await fetch("/.netlify/functions/sensor-data");
  const data: SensorData = await res.json();
  sensorHistory.ph = data.ph;
  sensorHistory.temperature = data.temperature;
  sensorHistory.turbidity = data.turbidity;
  sensorHistory.oxygen = data.oxygen;

  const labels = generateTimeLabels(sensorHistory.temperature.length);

  currentValues.ph = sensorHistory.ph.at(-1) || 0;
  currentValues.temperature = sensorHistory.temperature.at(-1) || 0;
  currentValues.turbidity = sensorHistory.turbidity.at(-1) || 0;
  currentValues.oxygen = sensorHistory.oxygen.at(-1) || 0;

  if (temperatureChartRef.value) {
    createLineChart(temperatureChartRef.value, {
      labels,
      label: "Temperatura (°C)",
      data: sensorHistory.temperature,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.1)",
    });
  }

  if (phChartRef.value) {
    createLineChart(phChartRef.value, {
      labels,
      label: "pH",
      data: sensorHistory.ph,
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.1)",
    });
  }

  if (turbidityChartRef.value) {
    createLineChart(turbidityChartRef.value, {
      labels,
      label: "Turbidez (NTU)",
      data: sensorHistory.turbidity,
      borderColor: "rgb(205, 133, 63)",
      backgroundColor: "rgba(205, 133, 63, 0.1)",
    });
  }

  if (oxygenChartRef.value) {
    createLineChart(oxygenChartRef.value, {
      labels,
      label: "O₂ Dissolvido (mg/L)",
      data: sensorHistory.oxygen,
      borderColor: "rgb(0, 191, 255)",
      backgroundColor: "rgba(0, 191, 255, 0.1)",
    });
  }
});
</script>

<style scoped>
/* Se quiser adicionar styles específicos deste componente, coloque aqui */
</style>
