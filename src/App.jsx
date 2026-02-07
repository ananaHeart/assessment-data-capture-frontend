// src/App.jsx
// This is the complete and correct version.

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import AppStartup from './AppStartup';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrincipalDashboardPage from './pages/PrincipalDashboardPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageTeachersPage from './pages/ManageTeachersPage';
import NotFoundPage from './pages/NotFoundPage';
import MyClassesPage from './pages/MyClassesPage'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<AppStartup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* --- Protected Routes --- */}
        <Route element={<ProtectedRoute />}> 
          <Route element={<MainLayout />}>
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            
            {/* Principal Routes */}
            <Route path="/principal/dashboard" element={<PrincipalDashboardPage />} />
            <Route path="/principal/manage-teachers" element={<ManageTeachersPage />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
            {/* --- THIS IS THE MISSING ROUTE --- */}
            <Route path="/teacher/my-classes" element={<MyClassesPage />} />
            {/* ----------------------------------- */}
          </Route>
        </Route>

        {/* Catch-all for any unknown URL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;