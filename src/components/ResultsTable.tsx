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
    <div className="card results-table-card" style={{
      border: '2px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '20px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(0, 0, 0, 0.03)',
      padding: '1.5rem',
      margin: '1.5rem'
    }}>
      <h2>Tabla de Iteraciones</h2>
      <div className="results-container">

        <div className="table-wrapper" style={{
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(0, 0, 0, 0.03)',
          border: '2px solid rgba(59, 130, 246, 0.2)'
        }}>
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