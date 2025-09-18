// src/components/AuthGuard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthGuard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Not logged in → redirect to login
        window.location.href = "/login";
        return;
      }

      // Logged in → fetch role
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        window.location.href = "/login";
        return;
      }

      // Redirect based on role
      if (profileData.role === "admin") window.location.href = "/admin";
      else window.location.href = "/student";
    }

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking authentication...</div>;

  return null; // AuthGuard doesn’t render anything itself
}
