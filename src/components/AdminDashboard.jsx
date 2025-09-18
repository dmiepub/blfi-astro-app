// src/components/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import DashboardHeader from "./DashboardHeader";
import "../styles/global.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserName(user.email); // or fetch from profile

      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.log(error);
      else setUsers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <DashboardHeader userName={userName} />
      <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Name</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Email</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Role</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4 capitalize">{u.role}</td>
                <td className="px-6 py-4">
                  <a
                    href={`/admin/edit/${u.id}`}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
