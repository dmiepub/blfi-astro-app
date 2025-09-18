// src/components/StudentDashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import DashboardHeader from "./DashboardHeader";
import Swal from "sweetalert2"; // <-- import SweetAlert
import "../styles/global.css";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.log(userError);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) console.log(error);
      else {
        setProfile(data);
        setName(data.name);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ name })
    .eq("id", profile.id)
    .select(); // 👈 forces Supabase to return updated row(s)

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: error.message,
    });
  } else if (data && data.length > 0) {
    setProfile(data[0]);
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile has been successfully updated!",
      timer: 2000,
      showConfirmButton: false,
    });
  }
};

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {profile && <DashboardHeader userName={profile.name} />}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md mt-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Profile</h2>
        <div className="flex flex-col gap-4">
          <label className="text-gray-600 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition mt-4"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
