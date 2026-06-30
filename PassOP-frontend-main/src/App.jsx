import { lazy, Suspense } from "react";
import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './context_api/ThemeContext';
import Navbar from './components/Navbar'
import Home from './components/Home';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import Auth0ErrorHandler from './components/Auth0errorhandler';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from "./components/ProtectedRoute";
import { FidgetSpinner } from 'react-loader-spinner'


const Login = lazy(() => import('./Page/Login'));
const Register = lazy(() => import('./Page/Register'));
const Manager = lazy(() => import('./components/Manager'));

function App() {
  const [count, setCount] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-color",
      isDark ? "#1f2937" : "#86efac"
    );
  }, [isDark]);


  return (
    <>
      <Auth0ErrorHandler>
        <ToastContainer />

        <Navbar />
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <FidgetSpinner
              visible
              height="50"
              width="50"
              ariaLabel="fidget-spinner-loading"
              wrapperClass="fidget-spinner-wrapper"
              ballColors={['#22c55e', '#22c55e', '#22c55e']}
              backgroundColor="#e2e8f0"
            />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Fetching your vault...
            </span>
          </div>
        }>
          
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />

            <Route path='/manager' element={
              <ProtectedRoute>
                <Manager />
              </ProtectedRoute >
            } />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Auth0ErrorHandler>
    </>
  )
}

export default App
