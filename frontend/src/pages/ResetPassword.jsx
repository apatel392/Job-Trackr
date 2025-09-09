import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function ResetPassword () {
    const [form, setForm] = useState({email:'', code:'', password:''});
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
        const res = await API.post('/api/auth/reset-password',form);
        setMessage(res.data.message)
        navigate('/login');
        }
        catch(err) {
            setMessage(err.response?.data?.message || "Error resetting password. Try again later!"); 
            console.error('Failed to change password!',err);
        }
    };

    const rules = {
        length: form.password.length >= 8,
        upper: /[A-Z]/.test(form.password),
        lower: /[a-z].*[a-z]/.test(form.password),
        special: /[^A-Za-z0-9]/.test(form.password), 
        number: /[0-9]/.test(form.password),
    }

    const updateRule = (condition) => ({
        color: condition ? "green" : "red"
    });
    
    return (
    <>
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-55px)] bg-gray-100x)] '>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md w-80 space-y-4'>
        <h2 className="text-xl font-bold text-center">Reset Password</h2>
        <input type="email" placeholder="Email" name="email" className="w-full border p-2 rounded" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required/>
        <input type="text" placeholder='Enter reset code' className="w-full border p-2 rounded" value={form.code} onChange={(e) => setForm({...form, code:e.target.value})} required />
        <div className="relative">
        <input type={showPassword ? "text" : "password"} className="w-full p-2 border rounded" placeholder="New Password" name="password" onChange={e => setForm({...form, password:e.target.value})} required/>
        <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
        </button>
        </div>
        <ul>
            <li style={updateRule(rules.length)}>At least 8 characters</li>
            <li style={updateRule(rules.upper)}>At least 1 uppercase letter</li>
            <li style={updateRule(rules.lower)}>At least 2 lowercase letters</li>
            <li style={updateRule(rules.number)}>At least 1 number</li>
            <li style={updateRule(rules.special)}>At least 1 special character</li>  
        </ul>
        <button className="w-full text-white bg-blue-600 py-2 rounded hover:bg-blue-700">Submit</button>
        </form>
        {message && <p className="mt-3 text-md text-red-600 text-bold">{message}</p>}
    </div>
    </>
    )
};
