import { useState } from 'react';
import * as math from 'mathjs';
import "./BrentView.css"

// Imports de Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import type { BrentResult, LineChartData, FormInputs, CompiledFunction } from '..';
import FunctionGraph from '../../components/FunctionGraph';
import InputForm from '../../components/ImputForm';
import ResultsTable from '../../components/ResultsTable';
import { solveBrent } from '../../logic/brent';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Estado unificado
interface RunSummary {
  func: string;
  initialA: number;
  initialB: number;
  fRoot: number | null;
}

interface RunData {
  summary: RunSummary;
  results: BrentResult;
}

function BrentView() {
  const [runData, setRunData] = useState<RunData | null>(null);
  const [chartData, setChartData] = useState<LineChartData | null>(null);
  const [sigFigs, setSigFigs] = useState<number>(8);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async (inputs: FormInputs) => {
    setError(null);
    setIsLoading(true);
    setRunData(null);
    setChartData(null);

    await new Promise(resolve => setTimeout(resolve, 250));

    try {
      const compiledFunc = math.compile(inputs.func);
      const fn: CompiledFunction = (x: number) => compiledFunc.evaluate({ x });

      // Verificar signos opuestos
      const fa = fn(inputs.a);
      const fb = fn(inputs.b);
      if (fa * fb >= 0) {
        setError("Error: f(a) y f(b) deben tener signos opuestos para garantizar una raíz en el intervalo.");
        return;
      }

      // Verificar si la función es constante
      if (Math.abs(fa - fb) < 1e-10) {
        setError("Error: La función parece ser constante en el intervalo dado. No se puede encontrar una raíz.");
        return;
      }

      setSigFigs(inputs.sigFigs);

      const { root, iterations } = solveBrent(fn, inputs.a, inputs.b, inputs.tolX, inputs.tolY);
      const fRoot = root !== null ? fn(root) : null;

      if (root === null) {
        setError("El método de Brent no convergió en el número máximo de iteraciones. Intente con un intervalo diferente o una tolerancia mayor.");
        return;
      }

      setRunData({
        summary: {
          func: inputs.func,
          initialA: inputs.a,
          initialB: inputs.b,
          fRoot: fRoot
        },
        results: { root, iterations }
      });

      generateChartData(fn, inputs.a, inputs.b, root);

    } catch (err) {
      if (err instanceof Error) {
        setError(`Error al procesar la función: ${err.message}`);
      } else {
        setError('Ocurrió un error desconocido al procesar la función.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateChartData = (fn: CompiledFunction, a: number, b: number, root: number | null) => {
    const points = 100;
    const rangePadding = (b - a) * 0.2;
    const min = a - rangePadding;
    const max = b + rangePadding;
    const step = (max - min) / points;
    const functionData: { x: number, y: number }[] = [];
    for (let i = 0; i <= points; i++) {
      const x = min + i * step;
      functionData.push({ x: x, y: fn(x) });
    }
    const rootData = root ? [{ x: root, y: fn(root) }] : [];
    setChartData({
      datasets: [
        { label: 'f(x)', data: functionData, borderColor: 'rgb(75, 192, 192)', tension: 0.1, pointRadius: 0 },
        { label: 'Raíz', data: rootData, borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgba(255, 99, 132, 1)', pointRadius: 6, showLine: false }
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
          <InputForm onSubmit={handleCalculate} isLoading={isLoading} />
          {error && (
            <div className="error-banner">
              <strong>Error:</strong> {error}
            </div>
          )}
        </section>

        <section className="app-results card">
          <h2>Resultados</h2>

          {runData && runData.results.root !== null ? (
            <ul className="results-summary">
              <li>
                <span>Función evaluada:</span>
                <code>{runData.summary.func}</code>
              </li>
              <li>
                <span>Intervalo inicial:</span>
                <code>[{runData.summary.initialA}, {runData.summary.initialB}]</code>
              </li>
              <li>
                <span>Valor f(x) en la raíz:</span>
                <code>{runData.summary.fRoot?.toExponential(4) ?? 'N/A'}</code>
              </li>
              <li>
                <span>Iteraciones realizadas:</span>
                <code>{runData.results.iterations.length - 1}</code>
              </li>
            </ul>
          ) : (
            <p className="placeholder-text">
              Ingrese una función y un intervalo para calcular.
            </p>
          )}

          <ResultsTable
            iterations={runData?.results.iterations ?? []}
            root={runData?.results.root ?? null}
            sigFigs={sigFigs}
          />

          {chartData && <FunctionGraph chartData={chartData} />}
        </section>
      </main>
    </div>
  );
}

export default BrentView;
