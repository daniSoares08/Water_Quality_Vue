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
          :value="sensorData.ph"
          unit=""
          icon="activity"
          :status="getSensorStatus(sensorData.ph, 6.5, 7.5, 6, 8)"
          :trend="0.2"
        />

        <SensorCard
          title="Temperatura"
          :value="sensorData.temperature"
          unit="°C"
          icon="thermometer"
          :status="getSensorStatus(sensorData.temperature, 22, 28, 18, 30)"
          :trend="-0.5"
        />

        <SensorCard
          title="Turbidez"
          :value="sensorData.turbidity"
          unit="NTU"
          icon="droplets"
          :status="getSensorStatus(sensorData.turbidity, 0, 5, 0, 10)"
          :trend="0.8"
        />

        <SensorCard
          title="O₂ Dissolvido"
          :value="sensorData.oxygen"
          unit="mg/L"
          icon="wind"
          :status="getSensorStatus(sensorData.oxygen, 5, 7, 4, 8)"
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
import { ref, onMounted, reactive } from "vue";
import SensorCard from "../components/SensorCard.vue";
import Chart from "chart.js/auto";

type SensorData = {
  ph: number;
  temperature: number;
  turbidity: number;
  oxygen: number;
};

const sensorData = reactive<SensorData>({
  ph: 7.2,
  temperature: 25.5,
  turbidity: 3.1,
  oxygen: 5.8,
});

// Referências para os gráficos
const temperatureChartRef = ref<HTMLCanvasElement | null>(null);
const phChartRef = ref<HTMLCanvasElement | null>(null);
const turbidityChartRef = ref<HTMLCanvasElement | null>(null);
const oxygenChartRef = ref<HTMLCanvasElement | null>(null);
const temperatureChart = ref<Chart | null>(null);
const phChart = ref<Chart | null>(null);
const turbidityChart = ref<Chart | null>(null);
const oxygenChart = ref<Chart | null>(null);

const timeLabels = ref<string[]>([]);
const temperatureHistory: number[] = [];
const phHistory: number[] = [];
const turbidityHistory: number[] = [];
const oxygenHistory: number[] = [];

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

// Utilitários para gerar dados fake
const generateTimeLabels = () => {
  const labels: string[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now);
    d.setHours(now.getHours() - i);
    labels.push(`${d.getHours()}:00`);
  }
  return labels;
};

const generateRandomData = (baseValue: number, variance: number, count: number) => {
  return Array.from({ length: count }, () => baseValue + Math.random() * variance * 2 - variance);
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
  return new Chart(canvas, {
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

const addData = (chart: Chart | null, arr: number[], value: number) => {
  if (!chart) return;
  arr.push(value);
  if (arr.length > 24) arr.shift();
  chart.data.datasets[0].data = arr;
  chart.update();
};

const fetchData = async () => {
  try {
    const res = await fetch("/.netlify/functions/data");
    const data = await res.json();
    sensorData.ph = data.ph;
    sensorData.temperature = data.temperature;
    sensorData.turbidity = data.turbidity;
    sensorData.oxygen = data.oxygen;

    addData(temperatureChart.value, temperatureHistory, data.temperature);
    addData(phChart.value, phHistory, data.ph);
    addData(turbidityChart.value, turbidityHistory, data.turbidity);
    addData(oxygenChart.value, oxygenHistory, data.oxygen);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  timeLabels.value = generateTimeLabels();
  temperatureHistory.push(...generateRandomData(25, 2, 24));
  phHistory.push(...generateRandomData(7.2, 0.5, 24));
  turbidityHistory.push(...generateRandomData(3.1, 1.0, 24));
  oxygenHistory.push(...generateRandomData(5.8, 0.8, 24));

  if (temperatureChartRef.value) {
    temperatureChart.value = createLineChart(temperatureChartRef.value, {
      labels: timeLabels.value,
      label: "Temperatura (°C)",
      data: temperatureHistory,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.1)",
    });
  }

  if (phChartRef.value) {
    phChart.value = createLineChart(phChartRef.value, {
      labels: timeLabels.value,
      label: "pH",
      data: phHistory,
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.1)",
    });
  }

  if (turbidityChartRef.value) {
    turbidityChart.value = createLineChart(turbidityChartRef.value, {
      labels: timeLabels.value,
      label: "Turbidez (NTU)",
      data: turbidityHistory,
      borderColor: "rgb(205, 133, 63)",
      backgroundColor: "rgba(205, 133, 63, 0.1)",
    });
  }

  if (oxygenChartRef.value) {
    oxygenChart.value = createLineChart(oxygenChartRef.value, {
      labels: timeLabels.value,
      label: "O₂ Dissolvido (mg/L)",
      data: oxygenHistory,
      borderColor: "rgb(0, 191, 255)",
      backgroundColor: "rgba(0, 191, 255, 0.1)",
    });
  }

  fetchData();
  setInterval(fetchData, 5000);
});
</script>

<style scoped>
/* Se quiser adicionar styles específicos deste componente, coloque aqui */
</style>
