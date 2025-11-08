import { useState } from 'react';
import * as math from 'mathjs';


// Importaciones de Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import type { BrentResult, CompiledFunction, FormInputs, LineChartData } from '..';
import { solveBrent } from '../../logic/brent';
import InputForm from '../../components/ImputForm';
import ResultsTable from '../../components/ResultsTable';
import FunctionGraph from '../../components/FunctionGraph';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BrentView() {
  const [results, setResults] = useState<BrentResult>({ root: null, iterations: [] });
  const [chartData, setChartData] = useState<LineChartData | null>(null);
  const [precision, setPrecision] = useState<number>(8); // Default 8

  const handleCalculate = (inputs: FormInputs) => {
    try {
      const compiledFunc = math.compile(inputs.func);
      const fn: CompiledFunction = (x: number) => compiledFunc.evaluate({ x });

      if (fn(inputs.a) * fn(inputs.b) >= 0) {
        alert("Error: f(a) y f(b) deben tener signos opuestos.");
        return;
      }
      
      setPrecision(inputs.precision);

      const { root, iterations } = solveBrent(fn, inputs.a, inputs.b, inputs.tol);
      setResults({ root, iterations });
      
      generateChartData(fn, inputs.a, inputs.b, root);

    } catch (error) {
      if (error instanceof Error) {
        alert(`Error al procesar la función: ${error.message}`);
      } else {
        alert('Ocurrió un error desconocido.');
      }
    }
  };

  const generateChartData = (fn: CompiledFunction, a: number, b: number, root: number | null) => {
    const points = 100;
    const rangePadding = (b - a) * 0.2;
    const min = a - rangePadding;
    const max = b + rangePadding;
    const step = (max - min) / points;
    const labels: string[] = [];
    const functionValues: number[] = [];

    for (let i = 0; i <= points; i++) {
      const x = min + i * step;
      labels.push(x.toFixed(2));
      functionValues.push(fn(x));
    }

    const rootData = root ? [{ x: root, y: fn(root) }] : [];

    setChartData({
      labels,
      datasets: [
        {
          label: 'f(x)',
          data: functionValues,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          pointRadius: 0,
        },
        {
          label: 'Raíz',
          data: rootData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 6,
          showLine: false,
        }
      ],
    });
  };

  return (
    <div className="brent-view-container">
      <header className="app-header">
        <h1>Método de Brent</h1>
        <p>Calculadora de raíces de funciones</p>
      </header>

      <main className="app-main">
        <section className="app-controls card">
          <h2>Parámetros de Entrada</h2>
          <InputForm onSubmit={handleCalculate} />
        </section>

        <section className="app-results card">
          <h2>Resultados</h2>
          <ResultsTable
            iterations={results.iterations}
            root={results.root}
            precision={precision}
          />
          {chartData && <FunctionGraph chartData={chartData} />}
        </section>
      </main>
    </div>
  );
}

export default BrentView;