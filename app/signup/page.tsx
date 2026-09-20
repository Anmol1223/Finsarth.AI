"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Image from "next/image";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup() {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    alert(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
    );
    return;
  }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created successfully. Please check your email for verification.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        <div className="hidden lg:flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold mb-6">
            FinSarth AI
          </h1>

          <p className="text-xl text-slate-300 mb-10">
            Your AI-Powered Financial Operating System.
          </p>

          <div className="space-y-4 text-slate-300">
            <p>✅ AI-Powered Insights</p>
            <p>✅ Smart Transaction Categorization</p>
            <p>✅ Bank Statement Analysis</p>
            <p>✅ Financial Health Tracking</p>
            <p>✅ Secure Cloud Storage</p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-cyan-400 font-semibold">
              Bank-Grade Security
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Your financial data is securely encrypted and protected.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <div className="mb-6 flex flex-col items-center">
           <Image
  src="/logo.png"
  alt="FinSarth AI"
  width={120}
  height={120}
  className="mb-3"/>

  <h2 className="mb-2 text-3xl font-bold">
              Create Account
            </h2>
             <p className="mb-6 text-slate-400">
  Start your FinSarth journey today.
</p>

</div>

<div className="space-y-4">
            
            
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="text-xs text-slate-500">
  Password must contain:
  <br />
  • 8+ characters
  <br />
  • 1 uppercase letter
  <br />
  • 1 lowercase letter
  <br />
  • 1 number
  <br />
  • 1 special character
</p>

<p className="text-sm">
  {password.length < 8
    ? "🔴 Weak"
    : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)
    ? "🟢 Strong"
    : "🟡 Medium"}
</p>

<div className="space-y-3">
  <label className="flex items-center gap-2 text-sm text-slate-400">
    <input
      type="checkbox"
      onChange={() => setShowPassword(!showPassword)}
    />
    Show Password
  </label>

  <label className="flex items-center gap-2 text-sm text-slate-400">
    <input type="checkbox" />
    I agree to Terms & Privacy Policy
  </label>
</div>

              <button
  onClick={handleSignup}
  className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-black hover:bg-cyan-400"
>
  Create Free Account
</button>
<div className="text-center text-sm text-slate-400">
  Already have an account?{" "}
  <a
    href="/login"
    className="ml-1 text-cyan-400 font-semibold hover:text-cyan-300"
  >
    Login
  </a>
</div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
