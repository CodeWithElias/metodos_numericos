import { Line } from 'react-chartjs-2';
import type { LineChartData } from '../types';
import type { ChartOptions } from 'chart.js';

interface FunctionGraphProps {
  chartData: LineChartData;
}

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
      grid: {
        drawBorder: false,
        color: (context: GridLineContext) => {
          if (context.tick.value === 0) {
            return 'rgba(0, 0, 0, 0.8)'; // Eje Y=0
          }
          return 'rgba(0, 0, 0, 0.1)';
        },
      },
    },
  },
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