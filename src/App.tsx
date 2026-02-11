import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/lib/auth-context'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Landing from '@/pages/Landing'
import Terms from '@/pages/public/Terms'
import Privacy from '@/pages/public/Privacy'
import Login from '@/pages/auth/Login'
import Signup from '@/pages/auth/Signup'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import AuthCallback from '@/pages/auth/AuthCallback'
import AdminLogin from '@/pages/auth/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import ComponentBuilder from '@/pages/admin/ComponentBuilder'
import SiteBuilder from '@/pages/builder/SiteBuilder'

import UserProfile from '@/pages/dashboard/UserProfile'
import Dashboard from '@/pages/dashboard/Dashboard'
import WebsiteSettings from '@/pages/dashboard/WebsiteSettings'
import CreateWebsiteWizard from '@/pages/dashboard/CreateWebsiteWizard'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/websites/new" element={<CreateWebsiteWizard />} />
            <Route path="/dashboard/websites/:id/builder" element={<SiteBuilder />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/websites/:id/settings" element={<WebsiteSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/components/new" element={<ComponentBuilder />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
