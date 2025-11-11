import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardView from './views/DashboardView';
import BrentView from './views/BrentView';

function App() {
  return (
    <Routes>
      {/* Ruta 1: La Portada (Dashboard)*/}
      <Route path="/" element={<DashboardView />} />

      {/* Ruta 2: El Layout de la Aplicación*/}
      <Route element={<Layout />}>
        <Route path="brent" element={<BrentView />} />
      </Route>
    </Routes>
  );
}

export default App;