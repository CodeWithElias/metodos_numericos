import { Link } from 'react-router-dom';
import '../../index.css'; // Crearemos este CSS

// Ícono de calculadora para el botón
const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Zm-18 0h18" />
  </svg>
);

function DashboardView() {
  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h2>Universidad Autónoma "Gabriel René Moreno"</h2>
          <h1>Métodos Numéricos (MAT-205)</h1>
        </header>

        <section className="dashboard-team">
          <h3>Proyecto Final: Método de Brent</h3>
          <ul className="team-list">
            <li>Dayana Vivian Cala Gonzales [cite: 6]</li>
            <li>Jairo Guerra Tarifa [cite: 7]</li>
            <li>Luis Fernando Iturralde Casucanqui [cite: 8]</li>
            <li>Adolfo Mendoza Ribera [cite: 9]</li>
            <li>Adalid Nicolas Revollo Roman [cite: 10]</li>
          </ul>
          <p className="teacher-name">
            <strong>Docente:</strong> Ing. Luis Antonio Gianella Peredo [cite: 13]
          </p>
        </section>

        <footer className="dashboard-footer">
          <Link to="/brent" className="cta-button">
            <CalculatorIcon />
            Calcular raíz con Brent
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default DashboardView;