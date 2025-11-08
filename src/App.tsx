import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardView from './types/views/DashboardView';
import BrentView from './types/views/BrentView';

function App() {
  return (
    <Routes>
      {/* Ruta 1: La Portada (Dashboard)
        Se renderiza en "/" SIN el <Layout> y, por lo tanto, sin el Sidebar.
      */}
      <Route path="/" element={<DashboardView />} />

      {/* Ruta 2: El Layout de la Aplicación
        Este <Layout> (que contiene el Sidebar) envuelve a todas
        las vistas de la calculadora, como "/brent".
      */}
      <Route element={<Layout />}>
        <Route path="brent" element={<BrentView />} />
        {/* Aquí puedes añadir más rutas que usen el sidebar */}
        {/* <Route path="biseccion" element={<BiseccionView />} /> */}
      </Route>
    </Routes>
  );
}

export default App;