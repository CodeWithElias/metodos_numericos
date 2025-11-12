// src/components/ResultsTable.tsx

import type { BrentIteration } from '../types';

interface ResultsTableProps {
  iterations: BrentIteration[];
  sigFigs: number;
  onRowClick: (iteration: BrentIteration) => void; // <-- AÑADIDO
}

function ResultsTable({ iterations, sigFigs, onRowClick }: ResultsTableProps) {
  if (iterations.length === 0) {
    return null;
  }

  return (
    <div className="results-container">
      
      <h3>Detalle de iteraciones: (Haz clic en una fila para ver los pasos)</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Iteración</th>
              <th>a</th>
              <th>b</th>
              <th>f(a)</th>
              <th>f(b)</th>
              <th>Error</th>
              <th>Método</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((iter) => (
              <tr 
                key={iter.i} 
                className={iter.i > 0 ? 'clickable-row' : ''} // Clase solo para iter > 0
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
  );
}

export default ResultsTable;