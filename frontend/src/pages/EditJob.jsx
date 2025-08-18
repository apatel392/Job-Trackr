import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from "../services/api";


export default function EditJob () {

    const [form, setForm] = useState({
        position:'',
        company:'',
        status:'',
        notes:'',
        job_link: ''
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
        <div className="min-h-[calc(100vh-100px)] w-full bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="w-full max-w-xs bg-white text-black dark:bg-gray-800 dark:text-white p-6 rounded-xl border shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <form onSubmit={handleEdit} className="space-y-4">
                <input 
                className="w-full border-2 p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                type="text"
                placeholder="Position"
                value={form.position}
                onChange={e=>setForm({...form, position:e.target.value})}
                />
                <input 
                className='w-full border-2 p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600'
                type='text'
                placeholder="Company"
                value={form.company}
                onChange={e=> setForm({...form, company:e.target.value})}
                />
                <select
                className="w-full border-2 p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={form.status}
                onChange={e => setForm({...form, status:e.target.value})}
                >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
                <textarea
                    className='w-full border-2 p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600'
                    type="text"
                    value={form.notes}
                    onChange={(e)=> setForm({...form, notes: e.target.value})}
                />
                <input 
                    className='w-full border-2 p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600'
                    type="url"
                    value={form.job_link}
                    onChange={(e) => setForm({...form, job_link: e.target.value})}
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Job</button>
            </form>
            </div>
        </div>
    );
}