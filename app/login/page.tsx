"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  alert(
    JSON.stringify(
      {
        user: data?.user?.email,
        error: error?.message,
      },
      null,
      2
    )
  );

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "/dashboard";
  }
}
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold mb-6">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-lg border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-cyan-600 p-3 text-white"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}