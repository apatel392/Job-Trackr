import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Login() {
    const [form,setForm] = useState({email:'', password:''});
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await API.post('/api/auth/login',form);
            localStorage.setItem('token',res.data.token);
            navigate('/dashboard');
        } 
        catch (err) {
            alert(err.response?.data?.message || 'Login Failed',error);
            console.error('Login error:', err);
        }
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-[calc(100vh-55px)] bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md w-80 space-y-4'>
                <h2 className='text-xl font-bold text-center'>Login</h2>
                <input type="email" name="email" placeholder='Email' className="w-full border p-2 rounded" required onChange={e => setForm({...form, email:e.target.value})}/>
                <input type="password" name="password" placeholder='Password' className="w-full p-2 border rounded" required onChange={e=> setForm({...form, password:e.target.value})}/>
                <button className="w-full text-white bg-blue-600 py-2 rounded hover:bg-blue-700">Login</button>
                <p className="text-sm text-center">Don't have an account?{' '}<Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
            </form>
        </div>
        </>
        
    );
}