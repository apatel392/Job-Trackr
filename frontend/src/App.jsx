import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './components/PublicLayout';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path='/register' element={<Register/>} />
                    <Route path='/login' element={<Login/>} />
                </Route>
                
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>    
                    <Route path='/dashboard' element = {<Dashboard/>} />
                    <Route path='/add' element={<AddJob/>} />
                    <Route path='/edit/:id' element={<EditJob/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;