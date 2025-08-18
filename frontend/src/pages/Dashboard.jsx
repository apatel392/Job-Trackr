import { useState, useEffect } from 'react';
import API from '../services/api';
import JobDetailsModal from '../components/JobDetailsModal';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [statusfilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/api/applications');
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (error) {
        setError('Failed to load jobs.');
        console.log('Failed to load jobs.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {

    if(sessionStorage.getItem('reminderShown')) return;
    API.get('/api/interviews').then(res => {
      if(res.data.length > 0) {
        const allReminders = res.data.map(r => `${r.company} - ${r.position}`).join('\n');
        alert(`You have ${res.data.length} follow-up reminder(s) today!\n\n ${allReminders}`);
      }
    });
    sessionStorage.setItem('reminderShown',"True");
  },[]);

  useEffect(() => {
    let result = [...jobs];
    if (search) {
      result = result.filter(
        (job) =>
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.position.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusfilter !== 'all') {
      result = result.filter((job) => job.status === statusfilter);
    }
    setFilteredJobs(result);
  }, [search, statusfilter, jobs]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this Job?')) {
      try {
        await API.delete(`/api/applications/${id}`);
        setJobs(jobs.filter((job) => job.id !== id));
      } catch (err) {
        alert('Failed to delete!', err);
      }
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="p-6 bg-white-100 text-gray-900 dark:bg-gray-900 dark:text-white w-full min-h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-semibold mb-4">Your Applications</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by position or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-5/6 p-2 border-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <select
          value={statusfilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/6 p-2 rounded border-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No job Applications found.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border-4 rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
            >
              <div>
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
              </div>

              <div className="mt-4 flex space-x-2 text-sm">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  View Details
                </button>
              </div>
              <div className="mt-4 flex space-x-2 text-sm">
                <Link
                  to={`/edit/${job.id}`}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-sm text-red-600 hover:underline dark:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
