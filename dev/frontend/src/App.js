import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DashboardPage from './pages/Dashboard';
import GameLandingPage from './pages/GameLandingPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='signup' element={<SignUpPage/>} />
        <Route path='forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='reset-password' element={<ResetPassword/>}></Route>
        <Route path='dashboard' element={<DashboardPage/>} />
        <Route path='gameLanding' element={<GameLandingPage/>} />
        <Route path='settings' element={<SettingsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
