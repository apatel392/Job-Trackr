import { useEffect, useState } from "react";
import API from '../services/api';

export default function JobDetailsModal({ job, onClose }) {

  const [interviews, setInterviews] = useState([]);

  const [newInterview, setNewInterview] = useState({
    interview_date: '',
    interview_type: '',
    notes: ''
  });

  useEffect(() => {
    if(job) {
      API.get(`/api/interviews/${job.id}`).then(res=> setInterviews(res.data));
    }
  },[job]);

  const addInterview = async() => {
    if(!newInterview.interview_date) return alert('Interview Date is required');
    try{
      const res = await API.post('/api/interviews', {job_id: job.id, ...newInterview});
      setInterviews([...interviews, res.data]);
      setNewInterview({ interview_date: '', interview_type: '', notes: '' });
    }
    catch(err){
      alert('Failed to add Interview',err)
    }
  }
  const deleteInterview = async(id) => {
    if(!confirm('Delete this interview?')) return;
    try{
      await API.delete(`/api/interviews/${id}`);
      setInterviews(interviews.filter(i => i.id!=id));
    }
    catch(err) {
      alert('Failed to delete interview', err);
    }
  };
  if (!job) return null; // Don't render if no job is selected

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-3xl lg:max-w-5xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✖  
        </button>
        <div className="grid gap-10 lg:grid-cols-2">
        <div className="p-5">
        <h2 className="text-xl font-bold">{job.position}</h2>
        <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
        <p className="text-sm mt-2">
          Status:{' '}
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {job.status}
          </span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Applied on: {new Date(job.created_at).toLocaleDateString()}
        </p>
        
          {job.notes && (
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Notes:</span> {job.notes}
          </p>
          )}

        {job.job_link && (
          <a
            href={job.job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-blue-500 hover:underline dark:text-blue-400"
          >
            View Resume
          </a>
        )}
        </div>

        <div className="p-5">
            {
              interviews.length === 0 ? (<p className="text-gray-500">No Interviews Scheduled.</p>) : (
                <><p className="text-gray-600 font-semibold dark:text-gray-300 pb-4">Scheduled Interviews</p>
                <ul>
                  {
                    interviews.map(i => (
                      <li key={i.id} className="border-b pb-2">
                        <p className="text-sm">{new Date(i.interview_date).toLocaleString()}</p>
                        {i.interview_type && <p className="text-xs">Type: {i.interview_type}</p>}
                        {i.notes && <p className="text-xs text-gray-500">Notes: {i.notes}</p>}
                        <button onClick={() => deleteInterview(i.id)}
                          className="text-xs hover:underline text-red-500 mt-1">
                          Delete
                        </button>
                      </li>
                    ))}
                </ul></>
              )}
              <div className="mt-4">
                <h4 className="font-semibold text-sm">Add Interview</h4>
                <input 
                  type="datetime-local"

                  value={newInterview.interview_date}
                  onChange={(e) => setNewInterview({...newInterview, interview_date:e.target.value})} 
                  className="w-full p-2 border-2 rounded mt-1 text-black dark:bg-gray-700 dark:text-white"
                />
                <input 
                  type="text"
                  placeholder="Type (Screening, Technical, HR...)"
                  value={newInterview.interview_type}
                  onChange={ (e)=> setNewInterview({...newInterview, interview_type:e.target.value})}
                  className="w-full p-2 border-2 rounded mt-1 text-black dark:bg-gray-700 dark:text-white"
                />
                <textarea
                  placeholder="Notes..."
                  value={newInterview.notes}
                  onChange={(e) => setNewInterview({...newInterview, notes:e.target.value})}
                  className="w-full p-2 border-2 rounded mt-1 text-black dark:bg-gray-700 dark:text-white"
                />
                <button onClick={addInterview}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                    Add Interview
                </button>
              </div>
        </div>
      </div>
      </div>
    </div>
  );
}
