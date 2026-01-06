import { useState } from "react";
import API from '../services/api';

export default function InterviewPrep() {
  const [res, setRes] = useState(null);
  const [jd, setJD] = useState("");
  const [qa, setQa] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const formdata = new FormData();
        formdata.append("res",res);
        formdata.append("jd",jd);

        const result = await API.post("/api/interviews/generate", formdata, {
            headers: { 'content-type': 'mutlipart/form-data'},
        });
        setQa(result.data);
    }
    catch(err) {
        setMessage(err.response?.data?.message || 'Failed to generate a response.');
        console.error('Failed to generate', err);
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start py-7 bg-white-100 text-gray-900 dark:bg-gray-900 dark:text-white w-full min-h-[calc(100vh-100px)]">
  <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6">
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">AI Interview Prep Assistant</h2>

      <label className="block">
        Job Description:
        <textarea
          value={jd}
          placeholder="Paste job description here..."
          onChange={(e) => setJD(e.target.value)}
          rows="9"
          className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
        />
      </label>

      <label className="block">
        Upload Resume (PDF/DOCX):
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setRes(e.target.files[0])}
          className="block mt-2 p-2 mb-3 text-black dark:text-white"
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Q&A"}
      </button>
    </form>

    {message && !qa && (
      <p className="mt-3 text-md text-red-600 font-bold">{message}</p>
    )}

    {qa && (
      <div className="mt-6 space-y-6">
        {qa.technical && (
          <div>
            <h3 className="text-lg font-semibold">Technical Questions</h3>
            <ul className="list-disc pl-6">
              {qa.technical.map((item, i) => (
                <li key={i} className="mb-3">
                  <p className="font-medium">{item.q}</p>
                  <p>{item.a}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {qa.behavioral && (
          <div>
            <h3 className="text-lg font-semibold">Behavioral Questions</h3>
            <ul className="list-disc pl-6">
              {qa.behavioral.map((item, i) => (
                <li key={i} className="mb-3">
                  <p className="font-medium">{item.q}</p>
                  <p>{item.a}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {qa.raw && (
          <div>
            <h3 className="text-lg font-semibold">Raw AI Response</h3>
            <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-auto">
              {qa.raw}
            </pre>
          </div>
        )}
      </div>
    )}
  </div>
</div>

  );
}
