"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function handleReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://finsarth.com/reset-password",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset link sent to your email.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-2 text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mb-6 text-slate-400">
          Enter your email address and we'll send you a password reset link.
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleReset}
            className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-black"
          >
            Send Reset Link
          </button>

          <p className="text-center text-sm text-slate-400">
            Back to Login
          </p>

        </div>
      </div>
    </main>
  );
}
