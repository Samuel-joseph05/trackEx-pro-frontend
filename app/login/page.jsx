"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/api/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import AuthSkeleton from "@/components/skeletons/AuthSkeleton";


export default function LoginPage() {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const data = await loginUser(form);

      //save token to local storage
      localStorage.setItem("token", data.token);
      // console.log(data);
      // console.log(form);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error.response?.data || error.message);

    }
    finally{
      setLoading(false)
    }
  };

  
  // if(loading){
  //   return <AuthSkeleton />
  // }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10">
      <Card className="w-full max-w-md rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(79,70,229,0.35)]">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
              <Lock className="h-8 w-8 text-indigo-400" />
            </div>

            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>

            <p className="mt-2 text-slate-400">
              Sign in to manage your expenses
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone */}

            <div className="space-y-2">
              <Label className="text-slate-300">Phone Number</Label>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <Input
                  name="phone"
                  type="text"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-slate-700 bg-slate-900/70 pl-10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>

              {errors.phone && (
                <p className="text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Password */}

            <div className="space-y-2">
              <Label className="text-slate-300">Password</Label>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-slate-700 bg-slate-900/70 pl-10 pr-12 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-indigo-600 text-lg font-semibold transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-8 border-t border-slate-700 pt-6 text-center">
            <p className="text-slate-400">Don&apos;t have an account?</p>

            <Link
              href="/register"
              className="mt-2 inline-block font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Create Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
