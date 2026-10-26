"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const inputClass ="";

const LayerStack = () => (
  <svg viewBox="0 0 120 110" className="h-auto w-56" aria-hidden="true">
    <polygon points="12,74 60,98 60,106 12,82" fill="#ebe9e5" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="60,98 108,74 108,82 60,106" fill="#d9d6d0" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="60,50 108,74 60,98 12,74" fill="#f12020" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="60,24 108,48 60,72 12,48" fill="#fff" fillOpacity="0.6" stroke="#a9a59f" strokeWidth="1.2" strokeDasharray="3 3" strokeLinejoin="round" />
    <polygon points="60,0 108,24 60,48 12,24" fill="#fff" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M38 24l22-11M44 28l22-11M50 32l14-7" stroke="#8d8982" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName]= useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: call your login API here (email, password),
      // then redirect, e.g. router.push("/dashboard")
      await Promise.resolve();
    } catch {
      setError("We could not log you in. Check your email and password, then try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid bg-[#1B1A18] max-w-[1000] m-10 mx-auto lg:grid-cols-2">
      {/* ---------- Form side ---------- */}
      <div className="flex flex-col px-6 py-8 sm:px-12 relative border border-neutral-800">

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-neutral-100">
            Create your account,
            <span className="block font-serif font-normal italic">turn your pdf into a quiz</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed ">
            Sign up for free to upload a pdf and get a quiz with explanations.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium ">
                Name
              </label>
              <input
                id="name"
                type="name"
                required
                autoComplete="name"
                placeholder="jhone"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full  border border-neutral-800  px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium ">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="relative">
                 <label htmlFor="password" className="text-sm mb-1 font-medium ">
                Password
              </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full  border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 px-3.5  text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-neutral-100 px-6 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create an account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Have an account?{" "}
            <Link href="/login" className="font-medium text-neutral-100 underline underline-offset-2">
              Login now
            </Link>
          </p>
        </div>
      </div>

      {/* ---------- Illustration side (desktop only) ---------- */}
      <aside className="hidden flex-col items-center justify-center gap-8  p-12 lg:flex">
        <LayerStack />
        <div className="max-w-xs text-center">
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-100">
            One PDF in,
            <span className="block font-serif font-normal italic">a full quiz out</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed ">
            Every question comes with an explanation, so you understand the answer, not just remember it.
          </p>
        </div>
      </aside>
    </main>
  );
};

export default Signup;