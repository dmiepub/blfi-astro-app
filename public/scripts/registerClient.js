// public/scripts/registerClient.js

// ✅ Load Supabase from CDN
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ⚡ Replace with your environment values
const SUPABASE_URL = "http://localhost:54321";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function initRegisterForm() {
  const form = document.getElementById("registerForm");
  const messageEl = document.getElementById("message");
  const btnText = document.getElementById("btnText");
  const spinner = document.getElementById("loadingSpinner");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageEl.textContent = "";

    btnText.textContent = "Processing...";
    //spinner.classList.remove("hidden");

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const country = formData.get("country");

    try {
      // ✅ Create user in Supabase Auth
      const { data: userData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signupError) throw signupError;

      // ✅ Insert into profiles table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userData.user.id,
          name,
          country,
        },
      ]);
      if (profileError) throw profileError;

      messageEl.textContent =
        "✅ Registration successful!";
      messageEl.className = "mt-4 text-center text-green-600 font-medium";
      form.reset();
    } catch (err) {
      messageEl.textContent = `❌ Registration failed: ${err.message}`;
      messageEl.className = "mt-4 text-center text-red-600 font-medium";
    } finally {
      btnText.textContent = "Register";
      //spinner.classList.add("hidden");
    }
  });
}
