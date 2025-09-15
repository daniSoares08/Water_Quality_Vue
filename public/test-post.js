// Este script simula sensores reais enviando dados variáveis para testar os gráficos
// Copie e cole no console do navegador ou inclua na página para testar

// Configurações iniciais - valores base para cada sensor
let baseTemp = 25;  // Temperatura base ~25°C
let basePh = 7.0;   // pH base ~7.0
let baseTurb = 5;   // Turbidez base ~5 NTU
let baseOxy = 6;    // Oxigênio base ~6 mg/L

// Função para simular variações naturais nos sensores
// Usa uma curva senoidal para simular ciclos naturais + ruído aleatório
const elapsed = { seconds: 0 };
function simulateNaturalVariation(baseValue, amplitude, noiseLevel = 0.1) {
  // Componente cíclico (senoidal)
  const cyclicComponent = Math.sin(elapsed.seconds / 20) * amplitude;
  // Componente de ruído (aleatório)
  const noise = (Math.random() - 0.5) * noiseLevel * 2;
  // Incrementar o tempo
  elapsed.seconds += 1;
  // Combinar base + ciclo + ruído
  return baseValue + cyclicComponent + noise;
}

// Função para gerar valores de sensores - simulando leituras reais com variação natural
function generateSensorData() {
  return {
    ph: parseFloat(simulateNaturalVariation(basePh, 0.5, 0.2).toFixed(2)),        // pH varia em +/- 0.5 com ruído
    temperature: parseFloat(simulateNaturalVariation(baseTemp, 2, 0.3).toFixed(1)), // Temp varia em +/- 2°C com ruído
    turbidity: parseFloat(simulateNaturalVariation(baseTurb, 2, 1).toFixed(1)),    // Turbidez varia em +/- 2 NTU com ruído
    oxygen: parseFloat(simulateNaturalVariation(baseOxy, 1, 0.3).toFixed(2))       // Oxigênio varia em +/- 1 mg/L com ruído
  };
}

// Função principal para simular e enviar dados
function simulatePostData() {
  const data = generateSensorData();

  // Log colorido para visualizar a variação
  console.log(
    `%cPOST: Temp: ${data.temperature}°C | pH: ${data.ph} | Turb: ${data.turbidity} NTU | O₂: ${data.oxygen} mg/L`,
    `color: ${data.ph < 6.5 || data.ph > 7.5 ? 'orange' : 'green'}`
  );

  // Enviar para o endpoint
  fetch('/.netlify/functions/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('%c✓ Dados enviados com sucesso', 'color: green');
    } else {
      console.error('%c✗ Erro ao enviar dados:', 'color: red', response.status);
    }
  })
  .catch(error => console.error('%c✗ Erro de rede:', 'color: red', error));
}

// Função para simular um cenário complexo (múltiplas leituras com tendências específicas)
function simulateScenario(scenario = 'normal', count = 10) {
  let intervalId;
  let counter = 0;
  
  console.log(`%c🔄 Iniciando simulação de cenário: ${scenario} (${count} leituras)`, 'color: blue; font-weight: bold');
  
  switch(scenario) {
    case 'aquecimento':
      baseTemp = 22; // Começar com temperatura mais baixa
      intervalId = setInterval(() => {
        baseTemp += 0.5; // Aumentar a temperatura gradualmente
        simulatePostData();
        counter++;
        if (counter >= count) {
          clearInterval(intervalId);
          console.log('%c✅ Simulação concluída!', 'color: green; font-weight: bold');
        }
      }, 2000);
      break;
      
    case 'contaminacao':
      basePh = 7.0; // Começar com pH neutro
      baseTurb = 3; // Turbidez baixa
      intervalId = setInterval(() => {
        basePh -= 0.2; // Acidificação gradual
        baseTurb += 0.8; // Aumento da turbidez
        simulatePostData();
        counter++;
        if (counter >= count) {
          clearInterval(intervalId);
          console.log('%c✅ Simulação concluída!', 'color: green; font-weight: bold');
        }
      }, 2000);
      break;
      
    case 'normal':
    default:
      intervalId = setInterval(() => {
        simulatePostData();
        counter++;
        if (counter >= count) {
          clearInterval(intervalId);
          console.log('%c✅ Simulação concluída!', 'color: green; font-weight: bold');
        }
      }, 2000);
  }
  
  return intervalId; // Permite parar manualmente se necessário
}

// Ajuda e instruções de uso
console.log('%c📊 Simulador de Sensores de Qualidade da Água 📊', 'font-size: 14px; font-weight: bold; color: #0066ff; background: #f0f8ff; padding: 5px;');
console.log('%cComandos disponíveis:', 'font-weight: bold');
console.log('%c• simulatePostData()%c - Enviar um único POST com dados', 'color: blue; font-weight: bold', 'color: black');
console.log('%c• const loop = setInterval(simulatePostData, 2000)%c - Iniciar simulação contínua', 'color: blue; font-weight: bold', 'color: black');
console.log('%c• clearInterval(loop)%c - Parar simulação contínua', 'color: blue; font-weight: bold', 'color: black');
console.log('%c• simulateScenario("aquecimento", 10)%c - Simular aquecimento gradual (10 leituras)', 'color: blue; font-weight: bold', 'color: black');
console.log('%c• simulateScenario("contaminacao", 10)%c - Simular contaminação gradual (10 leituras)', 'color: blue; font-weight: bold', 'color: black');

// Exemplo de uso:
// simulatePostData(); // Envia um único POST
// simulateScenario("aquecimento", 10); // Simula aquecimento gradual
