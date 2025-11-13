// src/components/ResultsTable.tsx

import type { BrentIteration } from '../types';

interface ResultsTableProps {
  root: number | null; // <-- El compilador no estaba viendo esta línea
  iterations: BrentIteration[];
  sigFigs: number;
  onRowClick: (iteration: BrentIteration) => void;
}

function ResultsTable({ iterations, sigFigs, onRowClick }: ResultsTableProps) {
  if (iterations.length === 0) {
    return null; // El placeholder se maneja en la vista principal
  }

  return (
    <div className="card results-table-card">
      <h2>Tabla de Iteraciones</h2>
      <div className="results-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Iteración</th>
                <th>a</th>
                <th>b</th>
                <th>f(a)</th>
                <th>f(b)</th>
                <th>Error (b - a)</th>
                <th>Método</th>
              </tr>
            </thead>
            <tbody>
              {iterations.map((iter) => (
                <tr
                  key={iter.i}
                  className={iter.i > 0 ? 'clickable-row' : ''}
                  onClick={() => onRowClick(iter)}
                >
                  <td>{iter.i}</td>
                  <td>{iter.a.toPrecision(sigFigs)}</td>
                  <td>{iter.b.toPrecision(sigFigs)}</td>
                  <td>{iter.fa.toPrecision(sigFigs)}</td>
                  <td>{iter.fb.toPrecision(sigFigs)}</td>
                  <td>
                    {iter.i === 0 ? "---" : iter.error.toPrecision(sigFigs)}
                  </td>
                  <td>{iter.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultsTable;
