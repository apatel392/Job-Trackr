import { useState} from "react";
import API from '../services/api';
import {useNavigate} from 'react-router-dom';

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await API.post('/api/auth/forgot-password',{email});
            setMessage(res.data.message);
            navigate('/reset-password');
        }
        catch(err)
        {
            setMessage(err.response?.data?.message || "Error sending reset code. Try Again!");
        }
    };

    return (
        <>
        <div className="flex items-center flex-col justify-center min-h-[calc(100vh-55px)] bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md w-80 space-y-4'>
            <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
            <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <button 
                type="submit" 
                className="w-full text-white bg-blue-600 py-2 rounded hover:bg-blue-700"
            >
                Send Reset Code
            </button>
            </form>
            {message && <p className="mt-3 text-md text-red-600 text-bold">{message}</p>}
        </div>
        </>
    );
}