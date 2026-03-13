import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import AppStartup from './AppStartup';
import MainLayout from './layouts/MainLayout';
import TeacherLayout from './layouts/TeacherLayout';
import ProtectedRoute from './components/ProtectedRoute';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrincipalDashboardPage from './pages/PrincipalDashboardPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import TeacherClassesPage from './pages/TeacherClassesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageTeachersPage from './pages/ManageTeachersPage';
import NotFoundPage from './pages/NotFoundPage';
import ClassDetailsPage from "./pages/ClassDetailsPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<AppStartup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          {/* Principal & Admin Layout (Sidebar) */}
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/principal/dashboard" element={<PrincipalDashboardPage />} />
            <Route path="/principal/manage-teachers" element={<ManageTeachersPage />} />
          </Route>

          {/* Teacher Layout (No Sidebar) */}
          <Route element={<TeacherLayout />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
            <Route path="/teacher/classes" element={<TeacherClassesPage />} />
            <Route path="/teacher/classes/:classId" element={<ClassDetailsPage />} />
            
          </Route>

        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;