"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

      // Example:
      // const data = await loginUser(form);
      // console.log(data);

      console.log(form);

      alert("Login Successful");
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-sky-100 via-cyan-50 to-indigo-100 px-4">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" />

      <Card className="relative w-full max-w-md rounded-3xl border-white/40 bg-white/70 shadow-2xl backdrop-blur-xl">

        <CardContent className="p-8">

          <h1 className="text-center text-3xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-center text-gray-500">
            Login to manage your expenses
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {/* Phone */}

            <div>
              <Label>Phone Number</Label>

              <div className="relative mt-2">

                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

                <Input
                  name="phone"
                  type="text"
                   maxLength={10}
                pattern="[0-9]{10}"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-11 pl-10"
                />

              </div>

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <Label>Password</Label>

              <div className="relative mt-2">

                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                  className="h-11 pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}

            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Register */}

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Register
            </Link>
          </p>

        </CardContent>

      </Card>

    </main>
  );
}