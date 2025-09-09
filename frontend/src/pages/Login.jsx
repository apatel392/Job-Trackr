import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Login() {
    const [form,setForm] = useState({email:'', password:''});
    const [error,setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await API.post('/api/auth/login',form);
            localStorage.setItem('token',res.data.token);
            setMessage(res.data.message);
            navigate('/dashboard');
        } 
        catch (err) {
            setMessage(err.response?.data?.message || 'Login Failed',error);
            console.error('Login error:', err);
        }
    };

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-55px)] bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md w-80 space-y-4'>
                <h2 className='text-xl font-bold text-center'>Login</h2>
                <input type="email" name="email" placeholder='Email' className="w-full border p-2 rounded" required onChange={e => setForm({...form, email:e.target.value})}/>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"} // toggle type
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        required
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button className="w-full text-white bg-blue-600 py-2 rounded hover:bg-blue-700">Login</button>
                <p className="text-sm text-center">Don't have an account?{' '}<Link to="/register" className="text-blue-600 hover:underline ">Register</Link></p>
                <p className="text-sm text-center">Forgot Password?{' '}<Link to="/forgot-password" className="text-blue-600 hover:underline ">Reset</Link></p>
            </form>
            {message && <p className="mt-3 text-md text-red-600 text-bold">{message}</p>}
        </div>
        </>
        
    );
}