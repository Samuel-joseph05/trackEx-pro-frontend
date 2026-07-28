"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/api/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
const router =useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Minimum 3 characters";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked")

    if (!validate()) return;

    console.log(form);

    try {
      const data = await createUser(form);
      console.log(data);
      // alert("User Registered Successfully");

  
      localStorage.setItem("token",data.token)// save token to local storage
      // console.log(localStorage.getItem("token"));
            toast.success("User Registered Successfully");
          setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      router.push("/dashboard");
    } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
      console.error(error);
      console.log(error.response?.data);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10">
  <Card className="w-full max-w-lg rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(79,70,229,0.35)]">
    <CardContent className="p-8">

      <div className="text-center mb-8">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
          <User className="h-8 w-8 text-indigo-400" />
        </div>

        <h1 className="text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-slate-400">
          Sign up to start tracking your expenses
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-slate-300">Name</Label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />

            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Samuel"
              className="h-12 rounded-xl border-slate-700 bg-slate-900/70 pl-10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>

          {errors.name && (
            <p className="text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-slate-300">Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />

            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="samuel@gmail.com"
              className="h-12 rounded-xl border-slate-700 bg-slate-900/70 pl-10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="text-slate-300">Phone Number</Label>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />

            <Input
              name="phone"
              value={form.phone}
              maxLength={10}
              pattern="[0-9]{10}"
              onChange={handleChange}
              placeholder="9876543210"
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
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="h-12 rounded-xl border-slate-700 bg-slate-900/70 pl-10 pr-12 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {errors.password && (
            <p className="text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-indigo-600 text-lg font-semibold transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
        >
          Create Account
        </Button>

      </form>

    </CardContent>
  </Card>
</main>
  );
}
