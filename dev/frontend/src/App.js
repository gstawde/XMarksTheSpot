import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import DasboardPage from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='signup' element={<SignUpPage/>} />
        <Route path='dashboard' element={<DasboardPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
