import { Line } from 'react-chartjs-2';
import type { LineChartData } from '../types';
import type { ChartOptions } from 'chart.js';

interface FunctionGraphProps {
  chartData: LineChartData;
}

const options: ChartOptions<'line'> = {
  // ...
  scales: {
    // ...
    y: {
      // ...
      grid: {
        color: (context) => {
          if (context.tick?.value === 0) {
            return 'rgba(0, 0, 0, 0.8)';
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