import { NavLink } from 'react-router-dom';

// Ícono de Inicio (para volver a la portada)
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

// Ícono de Calculadora (Brent)
const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Zm-18 0h18" />
  </svg>
);

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul className="sidebar-app-list">
        
        {/* Enlace a la Portada (Inicio) */}
        <li className="sidebar-app-item">
          <NavLink
            to="/"
            className={({ isActive }) => "app-link" + (isActive ? " active" : "")}
            end
          >
            <div className="app-icon"><HomeIcon /></div>
            <span className="app-name">Inicio</span>
          </NavLink>
        </li>

        {/* Enlace a tu App de Brent */}
        <li className="sidebar-app-item">
          <NavLink
            to="/brent"
            className={({ isActive }) => "app-link" + (isActive ? " active" : "")}
          >
            <div className="app-icon"><CalculatorIcon /></div>
            <span className="app-name">Método de Brent</span>
          </NavLink>
        </li>
        
        {/* Aquí puedes añadir más "apps" en el futuro */}

      </ul>
    </nav>
  );
}

export default Sidebar;