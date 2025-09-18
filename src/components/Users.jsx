import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/global.css";

export default function Users() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfiles() {
      setLoading(true);
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) setError(error);
      else setProfiles(data);
      setLoading(false);
    }
    loadProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600">
        <h1 className="text-2xl font-bold text-white">User List</h1>
        <a
          href="/register"
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-lg shadow hover:bg-gray-100 transition"
        >
          Register
        </a>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm border-b border-red-200">
          ❌ Error: {error.message}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        {profiles.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Country</th>
                <th className="px-6 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {profiles.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3 font-mono text-xs text-gray-500">{u.id}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">{u.name}</td>
                  <td className="px-6 py-3">{u.email}</td>
                  <td className="px-6 py-3">{u.country}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(u.created_at).toLocaleDateString()}{" "}
                    <span className="text-xs text-gray-400">
                      {new Date(u.created_at).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">📭 No records found</div>
        )}
      </div>
    </div>
  );
}
