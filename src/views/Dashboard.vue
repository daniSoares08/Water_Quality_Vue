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
          :value="sensorData.tds"
          unit="mg/L"
          icon="wind"
          :status="getSensorStatus(sensorData.tds, 5, 7, 4, 8)"
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
import { ref, onMounted, reactive, markRaw } from 'vue';
import SensorCard from "../components/SensorCard.vue";
import Chart from "chart.js/auto";

type SensorData = {
  ph: number;
  temperature: number;
  turbidity: number;
  tds: number;
};

const sensorData = reactive<SensorData>({
  ph: 0,
  temperature: 0,
  turbidity: 0,
  tds: 0,
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
          pointRadius: 3,
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

const addData = (chart: Chart | null, label: string, value: number) => {
  if (!chart) return;

  const labels = chart.data.labels as string[];
  const data   = chart.data.datasets[0].data as number[];

  labels.push(label);
  data.push(value);

  if (labels.length > 15) {       // mantém só 20
    labels.shift();
    data.shift();
  }
  chart.update('none');
};

const buildChartData = (
  list: any[],
  key: 'temperature' | 'ph' | 'turbidity' | 'oxygen'
) => ({
  labels: list.map(v =>
    new Date(v.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  ),
  data:   list.map(v => Number(v[key]) || 0),
});

const lastPlottedTs = ref<number | null>(null);

const fetchData = async () => {
  try {
    const res  = await fetch('/api/measurements/latest');
    const list = await res.json();               // agora é array

    if (!Array.isArray(list) || list.length === 0) return;

    /* último elemento → cards de “valor atual” */
    const last = list[list.length - 1];

    sensorData.ph          = +last.ph        || 0;
    sensorData.temperature = +last.temperature || 0;
    sensorData.turbidity   = +last.turbidity || 0;
    sensorData.tds      = +last.oxygen    || 0;

    /* se o gráfico está vazio, preenche todo o histórico de uma vez   */
    if ((temperatureChart.value?.data.datasets[0].data.length ?? 0) === 0) {
      const apply = (c: Chart | null, d: { labels: string[]; data: number[] }) => {
        if (!c) return;
        c.data.labels = d.labels;
        c.data.datasets[0].data = d.data;
        c.update('none');
      };

      apply(temperatureChart.value, buildChartData(list, 'temperature'));
      lastPlottedTs.value = list[list.length - 1].ts;
      apply(phChart.value,          buildChartData(list, 'ph'));
      lastPlottedTs.value = list[list.length - 1].ts;
      apply(turbidityChart.value,   buildChartData(list, 'turbidity'));
      lastPlottedTs.value = list[list.length - 1].ts;
      apply(oxygenChart.value,      buildChartData(list, 'oxygen'));
      lastPlottedTs.value = list[list.length - 1].ts;
    } else {
      /* ciclos seguintes — só empurra o ponto mais novo */
      if (lastPlottedTs.value !== last.ts) {
        const label = new Date(last.ts).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        addData(temperatureChart.value, label, +last.temperature || 0);
        addData(phChart.value,          label, +last.ph          || 0);
        addData(turbidityChart.value,   label, +last.turbidity   || 0);
        addData(oxygenChart.value,      label, +last.oxygen      || 0);

        lastPlottedTs.value = last.ts;   // memoriza o mais recente
    }
    
  }} catch (e) {
    console.error(e);
  }
};

onMounted(() => {


  if (temperatureChartRef.value) {
    temperatureChart.value = markRaw(createLineChart(temperatureChartRef.value, {
    labels: [],
    label: "Temperatura (°C)",
    data: [],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.1)",
  }));
  }

  if (phChartRef.value) {
    phChart.value = markRaw(createLineChart(phChartRef.value, {
      labels: [],
      label: "pH",
      data: [],
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.1)",
    }));
  }

  if (turbidityChartRef.value) {
    turbidityChart.value = markRaw(createLineChart(turbidityChartRef.value, {
      labels: [],
      label: "Turbidez (NTU)",
      data: [],
      borderColor: "rgb(205, 133, 63)",
      backgroundColor: "rgba(205, 133, 63, 0.1)",
    }));
  }

  if (oxygenChartRef.value) {
    oxygenChart.value = markRaw(createLineChart(oxygenChartRef.value, {
      labels: [],
      label: "O₂ Dissolvido (mg/L)",
      data: [],
      borderColor: "rgb(0, 191, 255)",
      backgroundColor: "rgba(0, 191, 255, 0.1)",
    }));
  }

  fetchData();
  // Update charts every second to display new POSTed data promptly
  setInterval(fetchData, 1000);
});
</script>
