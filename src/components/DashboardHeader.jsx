// src/components/DashboardHeader.jsx
import { supabase } from "../lib/supabaseClient";

export default function DashboardHeader({ userName }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <div className="bg-gray-100 p-4 rounded-b-lg shadow-md w-full text-center">
      <h1 className="text-2xl font-bold text-gray-800">Welcome, {userName}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
