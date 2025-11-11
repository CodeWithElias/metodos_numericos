// src/components/ResultsTable.tsx

import type { BrentIteration } from '../types';

interface ResultsTableProps {
  root: number | null;
  iterations: BrentIteration[];
  sigFigs: number;
}

function ResultsTable({ iterations, root, sigFigs }: ResultsTableProps) {
  // --- CAMBIO AQUÍ ---
  // Si no hay iteraciones, simplemente no renderiza nada.
  // La vista 'BrentView' se encarga del placeholder.
  if (iterations.length === 0) {
    return null;
  }
  // --- FIN DEL CAMBIO ---

  return (
    <div className="results-container">
      <div className="root-result">
        <span>Raíz encontrada:</span>
        <strong>{root ? root.toPrecision(sigFigs) : 'N/A'}</strong>
      </div>
      
      <h3>Detalle de iteraciones:</h3>
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
            </tr>
          </thead>
          <tbody>
            {iterations.map((iter) => (
              <tr key={iter.i}>
                <td>{iter.i}</td>
                <td>{iter.a.toPrecision(sigFigs)}</td>
                <td>{iter.b.toPrecision(sigFigs)}</td>
                <td>{iter.fa.toPrecision(sigFigs)}</td>
                <td>{iter.fb.toPrecision(sigFigs)}</td>
                
                {/* --- CAMBIO AQUÍ (Iteración 0) --- */}
                {/* Si es la iteración 0, no muestra error */}
                <td>
                  {iter.i === 0 ? "---" : iter.error.toPrecision(sigFigs)}
                </td>
                {/* --- FIN DEL CAMBIO --- */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsTable;