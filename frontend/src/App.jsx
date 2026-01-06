import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import InterviewPrep from './pages/InterviewPrep';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage/>} />
                <Route element={<PublicLayout />}>
                    <Route path='/register' element={<Register/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/forgot-password' element={<ForgotPassword/>} />
                    <Route path='/reset-password' element={<ResetPassword/>} />
                </Route>
                
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>    
                    <Route path='/dashboard' element = {<Dashboard/>} />
                    <Route path='/add' element={<AddJob/>} />
                    <Route path='/edit/:id' element={<EditJob/>} />
                    <Route path='/InterviewPrep' element={<InterviewPrep/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;