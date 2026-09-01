import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/track" element={<TrackOrderPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);

export default App;
