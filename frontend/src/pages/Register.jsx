import API from '../services/api';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Register() {
    const [form,setForm] = useState({name:'',email:'',password:''});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await API.post('/api/auth/register',form);
        navigate('/login');
        } catch (err) {
        setMessage(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
        console.error('Registration error:', err);
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

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-55px)] bg-gray-100 ">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold">Register</h2>
                <input className="w-full border p-2 rounded" type="text" name="name" placeholder='Name'  required onChange={e => setForm({ ...form, name:e.target.value})}/>
                <input className="w-full p-2 border rounded" placeholder='Email' type="email" name="email" required onChange={e => setForm({ ...form, email:e.target.value})}/>
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
                <ul>
                    <li style={updateRule(rules.length)}>At least 8 characters</li>
                    <li style={updateRule(rules.upper)}>At least 1 uppercase letter</li>
                    <li style={updateRule(rules.lower)}>At least 2 lowercase letters</li>
                    <li style={updateRule(rules.number)}>At least 1 number</li>
                    <li style={updateRule(rules.special)}>At least 1 special character</li>  
                </ul>
                <button className="w-full text-white bg-blue-600 py-2 rounded hover:bg-blue-700">Sign Up</button>
            </form>
            {message && <p className="mt-3 text-md text-red-600 text-bold">{message}</p>}
        </div>
        </>
        
    );
}