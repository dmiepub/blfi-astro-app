import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/global.css";

export default function AdminEditUser({ userId }) {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setProfile(data);
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
      setLoading(false);
    }

    fetchProfile();
  }, [userId]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ name, email, role })
      .eq("id", userId);

    if (error) return setError(error.message);

    // Redirect to admin dashboard
    window.location.href = "/admin";
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Edit User</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <input
        className="border p-3 rounded-lg mb-4 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-3 rounded-lg mb-4 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        className="border p-3 rounded-lg mb-4 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white py-3 rounded-lg w-full hover:bg-blue-700 transition"
      >
        Update
      </button>
      <a href="/admin" className="text-center mt-4 block text-gray-600 hover:underline">
        Cancel
      </a>
    </div>
  );
}