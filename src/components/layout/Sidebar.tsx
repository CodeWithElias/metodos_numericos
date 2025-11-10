import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCalculator } from 'react-icons/ai';
import "./Sidebar.css"

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
            title="Inicio"
          >
            <div className="app-icon"><AiOutlineHome /></div>
          </NavLink>
        </li>

        {/* Enlace a tu App de Brent */}
        <li className="sidebar-app-item">
          <NavLink
            to="/brent"
            className={({ isActive }) => "app-link" + (isActive ? " active" : "")}
            title="Método de Brent"
          >
            <div className="app-icon"><AiOutlineCalculator /></div>
          </NavLink>
        </li>
        
        {/* Aquí puedes añadir más "apps" en el futuro */}

      </ul>
    </nav>
  );
}

export default Sidebar;