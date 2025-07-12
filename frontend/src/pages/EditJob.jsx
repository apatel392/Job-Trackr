import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from "../services/api";


export default function EditJob () {

    const [form, setForm] = useState({
        position:'',
        company:'',
        status:''
    });
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        API.get(`/api/applications/${id}`)
        .then(res=>setForm(res.data))
        .catch(()=> alert('Job not Found!'));
    },[id]);
    
    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            await API.put(`/api/applications/${id}`,form);
            navigate('/dashboard');
        }
        catch(err) {
            alert('Failed to update Job',err);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <form onSubmit={handleEdit} className="space-y-4">
                <input 
                className="w-full border p-2 rounded"
                type="text"
                placeholder="Position"
                value={form.position}
                onChange={e=>setForm({...form, position:e.target.value})}
                />
                <input 
                className='w-full border p-2 rounded'
                type='text'
                placeholder="Company"
                value={form.company}
                onChange={e=> setForm({...form, company:e.target.value})}
                />
                <select
                className="w-full border p-2 rounded"
                value={form.status}
                onChange={e => setForm({...form, status:e.target.value})}
                >
                    <option value="applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Job</button>
            </form>
        </div>
    );
}