import { Link, useNavigate } from 'react-router-dom';
import UseTheme from '../hooks/useThemes';

export default function Navbar() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = UseTheme();

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('reminderShown');
        navigate('/login');
    };

    return (
        <nav className='bg-gray-600 text-white px-6 py-4 flex justify-between items-center shadow'>
            <h1 className='text-lg font-bold'><Link to='/dashboard'>JobTrackr</Link></h1>
            <div className='space-x-4'>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/add" className='hover:underline'>Add Job</Link>
                <button onClick={toggleTheme} className='dark:bg-gray-100 bg-gray-900 dark:text-black text-white px-2 py-1 rounded'>
                    { theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button onClick={handleLogout} className="bg-white text-blue-600 hover:bg-gray-100 rounded py-1 px-3">Logout</button>
            </div>
        </nav>
    );
}