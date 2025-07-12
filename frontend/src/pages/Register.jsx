import API from '../services/api';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Register() {
    const [form,setForm] = useState({name:'',email:'',password:''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await API.post('/api/auth/register',form);
        navigate('/login');
        } catch (err) {
        alert(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
        console.error('Registration error:', err);
    }
    };

    return (
        <>

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold">Register</h2>
                <input className="w-full border p-2 rounded" type="text" name="name" placeholder='Name'  required onChange={e => setForm({ ...form, name:e.target.value})}/>
                <input className="w-full p-2 border rounded" placeholder='Email' type="email" name="email" required onChange={e => setForm({ ...form, email:e.target.value})}/>
                <input className="w-full p-2 border rounded" placeholder='Password' type="password" name="password" required onChange={e => setForm({ ...form, password:e.target.value})}/>
                <button className="w-full text-white bg-blue-600 py-2  rounded hover:bg-blue-700">Sign Up</button>
            </form>
        </div>
        </>
        
    );
}