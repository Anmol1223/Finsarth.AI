"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
     const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const { data: transactions } = await supabase
  .from("transactions")
  .select("id")
  .eq("user_id", user.id);

if (!transactions || transactions.length === 0) {
  router.push("/import-data");
} else {
  router.push("/dashboard");
}
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
                Welcome Back
              </h2>

              <p className="text-slate-400">
                Login to continue.
              </p>
            </div>

            <div className="space-y-4">

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

              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </label>

              <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-black hover:bg-cyan-400"
              >
                Login
              </button>

              <p className="text-center text-sm text-slate-400">
                Forgot Password?
              </p>

              <div className="text-center text-sm text-slate-400">
  Don't have an account?{" "}
  <a
    href="/signup"
    className="ml-1 text-cyan-400 font-semibold hover:text-cyan-300"
  >
    Signup
  </a>
</div>

              <p className="text-center text-xs text-slate-500">
                Your data is encrypted and securely protected.
              </p>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}