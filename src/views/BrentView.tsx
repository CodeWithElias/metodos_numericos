// src/views/BrentView.tsx

import { useState } from 'react';
import * as math from 'mathjs';
import { solveBrent } from '../logic/brent';
import ResultsTable from '../components/ResultsTable';
import FunctionGraph from '../components/FunctionGraph';
import IterationModal from '../components/IterationModal';
import type { FormInputs, BrentResult, LineChartData, CompiledFunction, BrentIteration } from '../types';

import './BrentView.css'; // Importa el CSS de la vista

// Imports de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import InputForm from '../components/ImputForm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const [selectedIter, setSelectedIter] = useState<BrentIteration | null>(null);

  const handleCalculate = async (inputs: FormInputs) => {
    setError(null);
    setIsLoading(true);
    setRunData(null); 
    setChartData(null);
    setSelectedIter(null);
    
    await new Promise(resolve => setTimeout(resolve, 250));

    try {
      const compiledFunc = math.compile(inputs.func);
      const fn: CompiledFunction = (x: number) => compiledFunc.evaluate({ x });
      if (fn(inputs.a) * fn(inputs.b) >= 0) {
        setError("Error: f(a) y f(b) deben tener signos opuestos. Elige un intervalo válido.");
        return;
      }
      setSigFigs(inputs.sigFigs);
      const { root, iterations } = solveBrent(fn, inputs.a, inputs.b, inputs.tolX, inputs.tolY);
      const fRoot = root !== null ? fn(root) : null;
      setRunData({
        summary: { func: inputs.func, initialA: inputs.a, initialB: inputs.b, fRoot: fRoot },
        results: { root, iterations }
      });
      generateChartData(fn, inputs.a, inputs.b, root);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error en la función: ${err.message}. Revisa la sintaxis.`);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateChartData = (fn: CompiledFunction, a: number, b: number, root: number | null) => {
    // (sin cambios)
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
  
  const handleRowClick = (iteration: BrentIteration) => {
    if (iteration.i > 0) {
      setSelectedIter(iteration);
    }
  };
  
  const handleCloseModal = () => {
    setSelectedIter(null);
  };

  return (
    <div className="brent-view-container">
      <header className="app-header">
        <h1>Método de Brent</h1>
        <p>Calculadora de raíces de funciones</p>
      </header>

      {/* --- CAMBIO: ESTRUCTURA DEL LAYOUT --- */}
      <main className="app-main">
        
        {/* --- TARJETA 1: CONTROLES --- */}
        <section className="app-controls card">
          <h2>Parámetros de Entrada</h2>
          <InputForm onSubmit={handleCalculate} isLoading={isLoading} />
          {error && (
            <div className="error-message">{error}</div>
          )}
        </section>

        {/* --- TARJETA 2: RESULTADOS PRINCIPALES (RESUMEN + GRÁFICA) --- */}
        <section className="app-results-main card">
          <h2>Resultados Principales</h2>
          {runData && runData.results.root !== null ? (
            <>
              {/* El resumen va primero */}
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
              
              {/* La raíz encontrada va después */}
              <div className="results-container">
                <div className="root-result">
                  <span>Raíz encontrada:</span>
                  <strong>{runData.results.root.toPrecision(sigFigs)}</strong>
                </div>
              </div>

              {/* La gráfica va al final de esta tarjeta */}
              {chartData && <FunctionGraph chartData={chartData} />}
            </>
          ) : (
            <p className="placeholder-text">
              Ingrese una función y un intervalo para calcular.
            </p>
          )}
        </section>

      </main>
      {/* --- FIN DEL CAMBIO DE ESTRUCTURA --- */}

        {runData && (
          <section className="app-results-details card">
            <ResultsTable
              iterations={runData.results.iterations}
              sigFigs={sigFigs}
              onRowClick={handleRowClick}
            />
          </section>
        )}

      <IterationModal 
        iteration={selectedIter} 
        onClose={handleCloseModal} 
        sigFigs={sigFigs} 
      />
    </div>
  );
}

export default BrentView;