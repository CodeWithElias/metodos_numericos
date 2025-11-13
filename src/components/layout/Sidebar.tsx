import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCalculator, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import "./Sidebar.css"

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón de menú para móviles */}
      {isMobile && (
        <button
          className="mobile-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      )}

      {/* Overlay para cerrar sidebar en móviles */}
      {isMobile && isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <nav className={`sidebar ${isMobile && isOpen ? 'open' : ''}`}>
        <ul className="sidebar-app-list">
          {/* Enlace a la Portada (Inicio) */}
          <li className="sidebar-app-item">
            <NavLink
              to="/"
              className={({ isActive }) => "app-link" + (isActive ? " active" : "")}
              end
              title="Inicio"
              onClick={isMobile ? closeSidebar : undefined}
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
              onClick={isMobile ? closeSidebar : undefined}
            >
              <div className="app-icon"><AiOutlineCalculator /></div>
            </NavLink>
          </li>

          {/* Aquí puedes añadir más "apps" en el futuro */}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;