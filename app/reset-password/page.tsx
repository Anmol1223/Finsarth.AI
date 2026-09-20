"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleResetPassword() {
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

  const { error } = await supabase.auth.updateUser({
    password,
  });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully.");
      router.push("/login");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-2 text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mb-6 text-slate-400">
          Create a new secure password for your account.
        </p>

        <div className="space-y-4">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm">
  {password.length < 8
    ? "🔴 Weak"
    : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)
    ? "🟢 Strong"
    : "🟡 Medium"}
</p>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm text-slate-400">
  <input
    type="checkbox"
    onChange={() => setShowPassword(!showPassword)}
  />
  Show Password
</label>
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

          <button
            onClick={handleResetPassword}
            className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-black"
          >
            Update Password
          </button>

        </div>
      </div>
    </main>
  );
}