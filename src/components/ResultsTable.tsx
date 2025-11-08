import type { BrentIteration } from "../types";


interface ResultsTableProps {
  root: number | null;
  iterations: BrentIteration[];
  precision: number;
}

function ResultsTable({ iterations, root, precision }: ResultsTableProps) {
  if (iterations.length === 0) {
    return <p className="placeholder-text">Ingrese una función y un intervalo para calcular.</p>;
  }

  return (
    <div className="results-container">
      <div className="root-result">
        <span>Raíz encontrada:</span>
        <strong>{root ? root.toFixed(precision) : 'N/A'}</strong>
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
              <th>Error (b - a)</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((iter) => (
              <tr key={iter.i}>
                <td>{iter.i}</td>
                <td>{iter.a.toFixed(precision)}</td>
                <td>{iter.b.toFixed(precision)}</td>
                <td>{iter.fa.toExponential(4)}</td>
                <td>{iter.fb.toExponential(4)}</td>
                <td>{iter.error.toExponential(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsTable;