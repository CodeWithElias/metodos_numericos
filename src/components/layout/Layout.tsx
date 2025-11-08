import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div className="global-layout">
      <Sidebar />
      <main className="global-content">
        <Outlet /> {/* Aquí se renderizarán tus vistas */}
      </main>
    </div>
  );
}

export default Layout;