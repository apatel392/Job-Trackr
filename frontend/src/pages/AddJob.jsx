import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AddJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    position: '',
    company: '',
    status: 'applied',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/applications', form);
      navigate('/dashboard');
    } catch (err) {
      alert('Error adding job', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-white text-black dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Add New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            type="text"
            placeholder="Position"
            required
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            type="text"
            placeholder="Company"
            required
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <select
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}
