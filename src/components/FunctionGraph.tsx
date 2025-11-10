// src/components/FunctionGraph.tsx

import { Line } from 'react-chartjs-2';
// Importa los tipos necesarios de Chart.js y de tu archivo de tipos
import type { LineChartData } from '../types';
import type { ChartOptions } from 'chart.js';

// Define los props que el componente recibe
interface FunctionGraphProps {
  chartData: LineChartData;
}

// Define las opciones de la gráfica
const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Gráfico de la función y la raíz encontrada',
    },
  },
  scales: {
    x: {
      type: 'linear', // <-- CORRECCIÓN: Define el eje X como numérico
      title: {
        display: true,
        text: 'x',
      },
    },
    y: {
      title: {
        display: true,
        text: 'f(x)',
      },
      border: {
        display: false, // Oculta la línea del eje Y
      },
      grid: {
        // CORRECCIÓN: Tipa 'context' con 'GridLineContext'
        color: (context) => {
          if (context.tick?.value === 0) {
            return 'rgba(0, 0, 0, 0.8)'; // Dibuja el eje X (y=0) más oscuro
          }
          return 'rgba(0, 0, 0, 0.1)'; // Otras líneas de la grilla
        },
      },
    },
  },
  parsing: false // <-- CORRECCIÓN: Le dice a Chart.js que use los datos {x, y} directamente
};

function FunctionGraph({ chartData }: FunctionGraphProps) {
  if (!chartData) {
    return null;
  }
  
  return (
    <div className="graph-container">
      <Line options={options} data={chartData} />
    </div>
  );
}

export default FunctionGraph;